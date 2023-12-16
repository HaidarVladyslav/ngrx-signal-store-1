import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterEditorComponent } from './character-editor/character-editor.component';
import { CharacterListComponent } from "./character-list/character-list.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
  <h1 class="bg-blue-900 text-3xl px-6 py-3 font-bold underline text-white">
    TV Show Characters
  </h1>
  <div class="container mx-auto">
    <app-character-editor />
    <app-character-list />
  </div>
  `,
    styles: ``,
    imports: [RouterOutlet, CharacterEditorComponent, CharacterListComponent],
})
export class AppComponent {
  title = 'ngrx-signal-store-1';
}
