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
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = environment.WEATHER_API_KEY;
  private units = 'metric';

  private loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loading.asObservable();
  
  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<Weather> {
    this.loading.next(true);
    const url = `${this.apiUrl}?q=${city}&APPID=${this.apiKey}&units=${this.units}`

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
      if (error.status === 404) {
        errorMessage = `City not found: ${error.error.message || 'Make sure the city name is correct.'}`;
      } else if (error.status === 401) {
        errorMessage = `Akses tidak sah: ${error.error.message || 'Check your API Key.'}`;
      } else {
        errorMessage = `Error code ${error.status}: ${error.message}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
