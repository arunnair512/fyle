import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NavParamsService {
    private pageParams = {};

    set(page: string, data: any) {
        this.pageParams[page] = {...data};
    }
    get(page: string) {
        return this.pageParams[page];
    }
}
