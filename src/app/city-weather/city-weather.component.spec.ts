import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CityWeatherComponent } from './city-weather.component';
import { WeatherService } from '../weather.service';
import { Weather } from '../weather';
import { of, throwError } from 'rxjs';
import { CloseButtonComponent } from '../close-button/close-button.component';

describe('CityWeatherComponent', () => {
  let component: CityWeatherComponent;
  let fixture: ComponentFixture<CityWeatherComponent>;
  let mockWeatherService: jasmine.SpyObj<WeatherService>;

  const mockWeatherData: Weather = {
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
  }

  beforeEach(async () => {
    mockWeatherService = jasmine.createSpyObj('WeatherService', ['getWeather']);

    await TestBed.configureTestingModule({
      imports: [CityWeatherComponent, CloseButtonComponent],
      providers: [
        { provide: WeatherService, useValue: mockWeatherService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CityWeatherComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('city', 'London');
  });

  it('should create the CityWeatherComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch weather data successfully on ngOnInit', () => {
    mockWeatherService.getWeather.and.returnValue(of(mockWeatherData));

    fixture.detectChanges(); 
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull(); 
    expect(component.weather).toEqual(mockWeatherData);
    expect(mockWeatherService.getWeather).toHaveBeenCalledWith('London');
  });

  it('should handle error when fetching weather data on ngOnInit', () => {
    const errorMessage = 'City not found';
    mockWeatherService.getWeather.and.returnValue(throwError(() => new Error(errorMessage)));

    fixture.detectChanges();

    expect(component.loading).toBeFalse();
    expect(component.error).toEqual(errorMessage);
    expect(component.weather).toEqual({} as Weather);
    expect(mockWeatherService.getWeather).toHaveBeenCalledWith('London');
  });

  it('should return formatted temperature', () => {
    component.weather = mockWeatherData;
    expect(component.getTemp()).toEqual(`${Math.floor(mockWeatherData.temp)}°C`);
  });

  it('should return formatted wind speed', () => {
    component.weather = mockWeatherData;
    expect(component.getWind()).toEqual(`${Math.floor(mockWeatherData.wind.speed)}km/h`);
  });
});
