import { Component } from '@angular/core';

import { NavParamsService } from '../../providers/navParamsService';
import { transformForecast } from '../../providers/transformWeather';
import {
    SUN,
    THUNDER,
    CLOUD,
    DRIZZLE,
    RAIN,
    SNOW
} from '../../constants/weatherIconState';
@Component({
    selector: 'app-weather-detail',
    templateUrl: './weather-detail.page.html',
    styleUrls: ['./weather-detail.page.scss']
})
export class WeatherDetailPage {
    private forecastData;
    private forecastList;
    private currentDay;
    private icons = {
        [CLOUD]: 'cloud',
        [SUN]: 'day-sunny',
        [RAIN]: 'rain',
        [SNOW]: 'snow',
        [THUNDER]: 'day-thunderstorm',
        [DRIZZLE]: 'day-showers'
    };

    constructor(private navParamsSrv: NavParamsService) {
        this.forecastData = this.navParamsSrv.get('detail');
        this.forecastList = transformForecast(this.forecastData);
        this.currentDay = this.forecastList.shift();
    }

    getWeatherIconClass(weatherState) {
        return this.icons[weatherState];
    }

    getWeatherIcon(weatherState) {
        return `wi-${this.getWeatherIconClass(weatherState.weatherState)}`;
    }

}
