import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CityFormComponent } from './city-form/city-form.component';
import { CityWeatherComponent } from './city-weather/city-weather.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CityFormComponent, CityWeatherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularhw';
  cities: string[] = []

  addCity(city: string){
    if(this.cities.indexOf(city.trim()) === -1) {
      this.cities.push(city.trim());
    }
  }

  isEmptyData(){
    return !this.cities.length;
  }

  removeCity(city: string){
    const index = this.cities.indexOf(city);
    if (index > -1) {
      this.cities.splice(index, 1);
    }
  }
}
