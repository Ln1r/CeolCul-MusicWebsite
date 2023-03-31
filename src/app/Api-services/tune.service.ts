import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TuneDetails } from './tune-details.interface';

@Injectable({
  providedIn: 'root'
})
export class TuneService {
  private baseUrl = 'https://thesession.org/tunes';

  constructor(private http: HttpClient) { }

  searchTunes(query: string): Observable<any> {
    const url = `${this.baseUrl}/search?q=${query}&format=json&perpage=35`;
    return this.http.get(url);
  }

  getTuneDetails(tuneId: number): Observable<TuneDetails> {
    return this.http.get<TuneDetails>(`${this.baseUrl}/${tuneId}?format=json`)
      .pipe(
        map(response => {
          // Parse response data if necessary
          return response;
        })
      );
  }
}
