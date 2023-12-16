import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharacterStore } from '../state/characters.store';

@Component({
  selector: 'app-character-editor',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  template: `
    <form #form="ngForm" class="shadow-2xl rounded-2xl p-5" [formGroup]="characterForm" (ngSubmit)="handleSubmit($event)">
      <div class="flex flex-col rounded-xl mb-2">
        <label>Character name</label>
        <input formControlName="characterName" class="h-12 w-full rounded-xl border-blue-900 border-2 " type="text" />
      </div>
      <div class="flex flex-col rounded-xl mb-2">
        <label>Character image</label>
        <input formControlName="characterImage" class="h-12 w-full rounded-xl border-blue-900 border-2" type="text" />
      </div>

      @if (!characterForm.valid && form['submitted']) {
        <div class="bg-red-300 border border-red-400 p-4 rounded-xl mb-2">
          Something went wrong
        </div>
      }
      <button [disabled]="!characterForm.valid && form['submitted']" type="submit" class="bg-blue-700 [&:not([disabled])]:hover:bg-blue-900 text-white py-2 px-4 rounded-lg cursor-pointer transition-all disabled:opacity-75 disabled:cursor-not-allowed">Add character</button>
    </form>
  `,
  styles: ``,
})
export class CharacterEditorComponent {
  @ViewChild('form') form!: FormGroupDirective;
  private fb = inject(FormBuilder);
  private characterStore = inject(CharacterStore);
  characterForm = this.fb.group({
    characterName: ['', Validators.required],
    characterImage: ['', Validators.required],
  });

  handleSubmit(event: SubmitEvent) {
    if (!this.characterForm.valid) return;
    const { characterImage: image, characterName: name } = this.characterForm.value;
    this.characterStore.addCharacter({ name: name!, image: image!, id: Date.now().toString() });
    this.form.resetForm();
  }
}
