import { Component, input, OnInit, output } from '@angular/core';
import { CloseButtonComponent } from '../close-button/close-button.component';
import { WeatherService } from '../weather.service';
import { Weather } from '../weather';

@Component({
  selector: 'app-city-weather',
  imports: [CloseButtonComponent],
  templateUrl: './city-weather.component.html',
  styleUrl: './city-weather.component.css',
})
export class CityWeatherComponent implements OnInit {
  city = input.required<string>()
  close = output<void>();
  loading = false;
  error: string | null = null;
  weather: Weather = {} as Weather;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loading = true;
    this.weatherService.getWeather(this.city()).subscribe({
      next: (data: Weather) => {
        this.weather = data;
      },
      error: (error: any) => {
        this.error = error.message;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  getTemp(){
    return `${Math.floor(this.weather.temp)}°C`;
  }

  getWind(){
    return `${Math.floor(this.weather.wind.speed)}km/h`;
  }

  closeClicked(){
    this.close.emit();
  }
}
