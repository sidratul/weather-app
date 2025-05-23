import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CityFormComponent } from './city-form/city-form.component'; // Assuming you'll mock or declare these
import { CityWeatherComponent } from './city-weather/city-weather.component'; // Assuming you'll mock or declare these

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, CityFormComponent, CityWeatherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'angularhw'`, () => {
    expect(component.title).toEqual('angularhw');
  });

  it('should add a city to the cities array', () => {
    const cityToAdd = 'London';
    component.addCity(cityToAdd);
    expect(component.cities).toContain(cityToAdd);
    expect(component.cities.length).toBe(1);
  });

  it('should not add duplicate cities', () => {
    const cityToAdd = 'Paris';
    component.addCity(cityToAdd);
    component.addCity(cityToAdd); 
    expect(component.cities).toContain(cityToAdd);
    expect(component.cities.length).toBe(1);
  });

  it('should trim whitespace when adding a city', () => {
    const cityWithWhitespace = '  New York  ';
    component.addCity(cityWithWhitespace);
    expect(component.cities).toContain('New York');
    expect(component.cities.length).toBe(1);
  });

  it('should return true if cities array is empty', () => {
    component.cities = [];
    expect(component.isEmptyData()).toBeTrue();
  });

  it('should return false if cities array is not empty', () => {
    component.cities = ['Tokyo'];
    expect(component.isEmptyData()).toBeFalse();
  });

  it('should remove an existing city from the cities array', () => {
    component.cities = ['Rome', 'Berlin', 'Madrid'];
    const cityToRemove = 'Berlin';
    component.removeCity(cityToRemove);
    expect(component.cities).not.toContain(cityToRemove);
    expect(component.cities.length).toBe(2);
  });

  it('should not change the cities array if trying to remove a non-existent city', () => {
    component.cities = ['Rome', 'Berlin'];
    const initialLength = component.cities.length;
    const cityToRemove = 'Lisbon';
    component.removeCity(cityToRemove);
    expect(component.cities.length).toBe(initialLength);
  });
});
