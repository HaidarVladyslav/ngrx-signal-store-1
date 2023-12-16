import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Character } from "./characters.store";

const API_URL = 'http://localhost:3000/'

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private http = inject(HttpClient);

  loadCharacters() {
    return this.http.get<Character[]>(API_URL + 'characters');
  }

  addCharacter(character: Character) {
    return this.http.post<Character>(API_URL + 'characters', { ...character });
  }

  deleteCharacter(id: Character['id']) {
    return this.http.delete<string>(API_URL + 'characters/' + id);
  }
}