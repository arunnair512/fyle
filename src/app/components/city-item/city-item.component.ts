import { Component, Input } from '@angular/core';
import { WeatherProvider } from '../../providers/weather';
@Component({
  selector: 'city-item',
  templateUrl: './city-item.component.html',
  styleUrls: ['./city-item.component.scss']
})
export class CityItemComponent {

  @Input() data: any;
  constructor(private weatherPrv: WeatherProvider) {
  }

  goToDetails() {
    this.weatherPrv.query('forecast', { id: this.data.id })
      .subscribe(
        forecastCity => console.log(forecastCity),
      error => {
        console.log(error);
        }
      );
  }

}
