import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-city-form',
  imports: [FormsModule],
  templateUrl: './city-form.component.html',
  styleUrl: './city-form.component.css'
})
export class CityFormComponent {
  cityName = '';

  city = output<string>();
  
  addCity(): void {
    if (!this.cityName.trim()) {
      return;
    }
    
    this.city.emit(this.cityName.trim());
    this.cityName = '';
  }
}
