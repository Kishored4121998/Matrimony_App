import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suggestion } from '../suggestion.model';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {
  private suggestionsUrl = 'assets/suggestions.json'; 

  constructor(private http: HttpClient) {}

  getSuggestions(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.suggestionsUrl);
  }
}
