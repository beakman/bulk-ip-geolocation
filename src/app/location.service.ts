import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import { delay } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class LocationItem {
    ip: string;
    lat: string;
    lng: string;
    city: string;
    region_code: string;
    region_name: string;
    country_code: string;
    country_name: string;
    time_zone: string;
}

/*class LocationItem {
  constructor(public ip: string,
              public lat: string,
              public lng: string,
              public city: string,
              public region_code: string,
              public region_name: string,
              public country_code: string,
              public country_name: string,
              public time_zone: string);
}*/

@Injectable()
export class LocationService {

  apiUrl:string = '//freegeoip.net/json/';

  constructor(private http: HttpClient) { }

  getMyLocation (): Observable<LocationItem> {
      return this.http.get<LocationItem>(this.apiUrl);
    }

  getLocation (ip:string): Observable<LocationItem> {
      // validate ip address
      return this.http.get<LocationItem>(this.apiUrl + ip);
    }

  getLocations (ips:string[]): Observable<LocationItem[]> {
      // validate ip address
      let locations = [];
      for (let i = 0; i < ips.length; i++) {
            locations.push(this.http.get<LocationItem>(this.apiUrl + ips[i]));
        }
      return forkJoin(locations);
    }
}