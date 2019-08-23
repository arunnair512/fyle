import { Api } from "./../../providers/api";
import { Component, OnInit } from "@angular/core";
import { LoadingController, NavController } from "@ionic/angular";

import { WeatherProvider } from "../../providers/weather";
import { NavParamsService } from "../../providers/navParamsService";
import { CacheService } from "ionic-cache";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  private cityList: Array<any> = [];
  private query: string;
  private key = "latest-searched-city";
  private cachedCity: any;
  private cachedCityList: any = [];
  public loadProgress: number = 0;
  private isLoading: boolean = false;
  private currentSelectedCity = "";
  banks: any = [];
  constructor(
    private weatherApi: WeatherProvider,
    private api: Api,

    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private navParamsSrv: NavParamsService,
    private cache: CacheService
  ) {
    this.query = "";
    this.loadCachedData();
  }

  ngOnInit() {
    //  this.getBanksList("MUMBAI");
  }

  /* 
  var result = data.filter(function(o) {
    return Object.keys(o).some(function(k) {
      return o[k].toString().toLowerCase().indexOf('s') != -1;
    })
  }) */

  loadCachedData() {
    this.cachedCityList = [];
    this.getCachedcities();
    console.log(this.cachedCityList);
  }
  search(event) {
    console.log(event);
    this.query = event.detail.value;
    console.log(this.query);
    /*   this.cityList = this.weatherApi.search(this.query); */
    var bank = this.banks.filter(function(hero) {
      return (
        hero.address.includes(event.detail.value.toUpperCase()) ||
        hero.district.includes(event.detail.value.toUpperCase()) ||
        hero.bank_name.includes(event.detail.value.toUpperCase()) ||
        hero.ifsc.includes(event.detail.value.toUpperCase()) ||
        hero.branch.includes(event.detail.value.toUpperCase())
      );
    });
    this.banks = bank;
  }

  clear(e) {
    this.getBanksList(this.currentSelectedCity);
  }
  citySelected(e) {
    console.log(e.detail.value);
    this.currentSelectedCity = e.detail.value;
    this.getBanksList(this.currentSelectedCity);
    // this.presentLoading();
  }

  getBanksList(cityName) {
    this.presentLoading();
    this.api.getBanksList(cityName).subscribe(async bankDetails => {
      console.log(bankDetails);
      this.banks = bankDetails;
      //  await this.loadingCtrl.dismiss();

      this.presentLoading();
    });
  }

  goToDetails(city) {
    this.presentLoading();
    //this.cachedCity=this.cache.getOrSetItem(this.key, city);
    this.cache.saveItem(this.key, city).then(val => {
      console.log(JSON.parse(val.value));
    });

    this.weatherApi
      .query("forecast", { id: city.id, units: "metric" })
      .subscribe(async cityDetails => {
        this.navParamsSrv.set("detail", cityDetails);
        //  await this.loadingCtrl.dismiss();
        this.presentLoading();
        await this.navCtrl.goForward("/detail");
      });
  }

  getCachedcities() {
    if (this.cache.itemExists("cachedCityList")) {
      console.log(this.cache.getItem("cachedCityList"));

      this.cache.getItem("cachedCityList").then(data => {
        console.log(JSON.parse(data));
        this.cachedCityList.unshift(JSON.parse(data));
        this.cityList = [];
        this.cityList = this.cachedCityList;
        // this.loadCityList();

        // this.concat();
      });
    } else {
      console.log("no-cache");
    }
    //   let data = await this.cache.getItem(this.key)
    //  let dat=  JSON.parse(data.value);
    //   console.log( data)
    //  this.cityList.push(data)
  }
  loadCityList() {
    this.getBanksList(this.currentSelectedCity);
  }

  async presentLoading() {
    this.isLoading = !this.isLoading;
    setInterval(() => {
      if (this.loadProgress < 100) this.loadProgress += 1;
      else clearInterval(this.loadProgress);
    }, 25);
    /*     const loading = await this.loadingCtrl.create({
            content: 'Please wait...',
            translucent: true,
            cssClass: 'custom-class custom-loading'
        });
        return await loading.present(); */
  }
}
