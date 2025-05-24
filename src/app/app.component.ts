import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CityFormComponent } from './city-form/city-form.component';
import { CityWeatherComponent } from './city-weather/city-weather.component';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CityFormComponent, CityWeatherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angularhw';
  cities: string[] = []
  cityKey = 'CITIES';
  constructor(private storageService: LocalStorageService) {}
  
  ngOnInit(): void {
    const storageData = this.storageService.getItem(this.cityKey);
    if (!storageData) {
      return;
    }
    this.cities = JSON.parse(storageData);
  }

  addCity(city: string){
    if(this.cities.indexOf(city.trim()) === -1) {
      this.cities.push(city.trim());
      this.updateCityStorage();
    }
  }

  isEmptyData(){
    return !this.cities.length;
  }

  removeCity(city: string){
    const index = this.cities.indexOf(city);
    if (index > -1) {
      this.cities.splice(index, 1);
      this.updateCityStorage();
    }
  }

  updateCityStorage(){
    this.storageService.setItem(this.cityKey, JSON.stringify(this.cities));
  }
}
