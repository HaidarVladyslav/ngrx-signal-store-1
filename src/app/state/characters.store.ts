import { Signal, inject } from "@angular/core";
import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { CharactersService } from "./characters.service";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { delay, pipe, switchMap, tap } from "rxjs";
import { tapResponse } from '@ngrx/operators';

export interface Character {
  name: string;
  image: string;
  id: string;
}

export interface CharacterState {
  characters: Character[],
  loading: boolean,
  isDeleting: boolean;
}

export const CharacterStore = signalStore(
  { providedIn: 'root' },
  withState<CharacterState>({
    characters: [],
    loading: false,
    isDeleting: false
  }),
  withMethods((
    { characters, ...state },
    charactersService = inject(CharactersService)
  ) => ({
    // ---- local usage
    // addCharacter(character: Character) {
    //   patchState(state, { characters: [...characters(), character] })
    // },
    // ---- API usage
    addCharacter: rxMethod<Character>(
      pipe(
        // tap(() => patchState(state, { loading: true })),
        switchMap((character) => charactersService.addCharacter(character)
          .pipe(
            tapResponse({
              next: (character) => patchState(state, { characters: [...characters(), character] }),
              error: console.error,
              finalize: () => patchState(state, { loading: false })
            })
          )
        )
      )
    ),
    // ---- local usage
    // removeCharacter(id: Character['id']) {
    //   patchState(state, { characters: characters().filter((char: Character) => char.id !== id) })
    // },
    // ---- API usage
    removeCharacter: rxMethod<string>(
      pipe(
        tap(() => patchState(state, { isDeleting: true })),
        delay(2000),
        switchMap((id) => charactersService.deleteCharacter(id)
          .pipe(
            tapResponse({
              next: () => {
                patchState(state, { characters: characters().filter(char => char.id !== id) })
              },
              error: console.error,
              finalize: () => patchState(state, { isDeleting: false })
            })
          )
        )
      )
    ),
    load: rxMethod<void>(
      pipe(
        tap(() => patchState(state, { loading: true })),
        delay(2000),
        switchMap(() => charactersService.loadCharacters().pipe(
          tapResponse({
            next: (characters) => patchState(state, { characters }),
            error: console.error,
            finalize: () => patchState(state, { loading: false })
          })
        )
        ))
    )
  })),
  withHooks({
    onInit({ load }) {
      load()
    }
  })
);