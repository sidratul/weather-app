import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CityFormComponent } from './city-form.component';
import { FormsModule } from '@angular/forms'; // Required for ngModel

describe('CityFormComponent', () => {
  let component: CityFormComponent;
  let fixture: ComponentFixture<CityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityFormComponent, FormsModule], // Import FormsModule as it's used by CityFormComponent
    }).compileComponents();

    fixture = TestBed.createComponent(CityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initial change detection
  });

  it('should create the CityFormComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty cityName initially', () => {
    expect(component.cityName).toEqual('');
  });

  it('should emit the city name and clear the input when addCity is called with a valid name', () => {
    const testCity = '  London  ';
    let emittedCity: string | undefined;

    component.city.subscribe((city: string) => {
      emittedCity = city;
    });

    component.cityName = testCity;
    component.addCity();

    expect(emittedCity).toEqual('London');
    expect(component.cityName).toEqual('');
  });

  it('should not emit or clear the input when addCity is called with an empty string', () => {
    let emittedCity: string | undefined;
    const initialCityName = 'Existing City';

    component.city.subscribe((city: string) => {
      emittedCity = city;
    });

    component.cityName = '';
    component.addCity();

    expect(emittedCity).toBeUndefined();
    expect(component.cityName).toEqual('');
  });

  it('should not emit or clear the input when addCity is called with whitespace only', () => {
    let emittedCity: string | undefined;
    const initialCityName = 'Existing City';

    component.city.subscribe((city: string) => {
      emittedCity = city;
    });

    component.cityName = '   ';
    component.addCity();

    expect(emittedCity).toBeUndefined();
    expect(component.cityName).toEqual('   ');
  });
});
