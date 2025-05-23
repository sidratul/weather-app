import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Weather } from './weather';
import { catchError, map, finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loading.asObservable();
  
  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<Weather> {
    this.loading.next(true);
    const url = `/api/weather/${city}`

    return this.http.get<Weather>(url).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError),
      finalize(() => this.loading.next(false))
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `${error.error.message || 'Internal server error.'}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
