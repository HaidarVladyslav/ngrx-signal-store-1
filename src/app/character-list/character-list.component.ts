import { Component, Signal, inject } from '@angular/core';
import { Character, CharacterStore } from '../state/characters.store';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [],
  template: `
  <div class="grid grid-cols-3 mt-5 gap-3">
    @if (!loading()) {
      @for (character of characters(); track character.id) {
      <div class="rounded-xl shadow-2xl">
        <img class="rounded-tl-xl border-2 border-white rounded-tr-xl w-full h-56 object-cover" [src]="character.image" alt="">
        <div class="p-5 flex items-center justify-between">
          <span class="text-3xl">{{ character.name }}</span>
          <button [disabled]="isDeleting()" (click)="characterStore.removeCharacter(character.id)" class="cursor-pointer [&:not([disabled])]:hover:bg-teal-200 disabled:bg-slate-900 disabled:text-white p-1 rounded-full transition-all">
            <span class="material-symbols-outlined flex items-center justify-center">delete</span>
          </button>
        </div>
      </div>
      } @empty {
        <div class="rounded-xl text-center col-span-full">
          <span class="text-3xl">{{ 'no data yet' }}</span>
        </div>
      }
    } @else {
      <div class="rounded-xl col-span-full text-center">
        <span class="text-3xl">{{ 'Loading...' }}</span>
      </div>
    }
    
  </div>
  `,
  styles: ``,
})
export class CharacterListComponent {
  public characterStore = inject(CharacterStore);
  characters: Signal<Character[]> = this.characterStore.characters;
  loading = this.characterStore.loading;
  isDeleting = this.characterStore.isDeleting;
}
