import { Component, input, output } from '@angular/core';
import { CloseButtonComponent } from '../close-button/close-button.component';

@Component({
  selector: 'app-city-weather',
  imports: [CloseButtonComponent],
  templateUrl: './city-weather.component.html',
  styleUrl: './city-weather.component.css'
})
export class CityWeatherComponent {
  city = input.required<string>()
  close = output<void>();
  loading = false;
  data = {};

  closeClicked(){
    this.close.emit();
  }
}
