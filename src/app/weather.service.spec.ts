// src/app/weather.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'; // Import provideHttpClientTesting
import { WeatherService } from './weather.service';
import { HttpErrorResponse, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Import provideHttpClient and withInterceptorsFromDi
describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;
  const mockWeatherData = {
    temp: 24.85,
    feels_like: 25.9,
    temp_min: 24.49,
    temp_max: 25.05,
    pressure: 1006,
    humidity: 96,
    sea_level: 1006,
    grnd_level: 1005,
    id: 802,
    main: "Clouds",
    description: "scattered clouds",
    icon: "https://openweathermap.org/img/wn/03n.png",
    wind: {
      speed: 1.54,
      deg: 280
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting() 
      ]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve weather data for a city', (done) => {
    const cityName = 'London';

    service.getWeather(cityName).subscribe(data => {
      expect(data.description).toEqual(mockWeatherData.description);
      expect(data.temp).toEqual(mockWeatherData.temp);
      done()
    });

    const req = httpMock.expectOne(request =>
      request.url.includes(cityName)
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockWeatherData);
  });

  it('should handle HTTP errors when fetching weather data', (done) => {
    const cityName = 'NonExistentCity';
    const errorMessage = 'City not found';
    const status = 500;

    service.getWeather(cityName).subscribe({
      next: () => fail('should have failed with a 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.message).toBe(errorMessage);
        done()
      }
    });



    const req = httpMock.expectOne(request =>
      request.url.includes(cityName)
    );
    expect(req.request.method).toEqual('GET');
    req.flush({message: errorMessage}, { status, statusText: 'Not Found' });
  });
});