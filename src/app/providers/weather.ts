import { Injectable } from '@angular/core';
import { StorageProvider } from './storage';

import { Api } from './api';

const cities: Array<any> = require('../data/city.list.json');

@Injectable()
export class WeatherProvider {
    constructor(public api: Api, private storage: StorageProvider) {}
    query(endpoint: string, params?: any): any {
        return this.api.get(endpoint, params);
    }
    search(query: string) {
        if (query.length > 2) {
            const filter = this.queryToFilter(query);
            return cities.filter(cityItem => {
                for (const key in filter) {
                    if (cityItem[key] === undefined || !cityItem[key].includes(filter[key])) {
                        return false;
                    }
                }
                return true;
            });
        }
    }

    queryToFilter(query: string) {
        const [name, country] = query.split(',').map((item) => item.trim());
        const filter = {name, country};
        Object.keys(filter).forEach(key => filter[key] === undefined && delete filter[key]);
        return filter;
    }
}
