import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LocationService } from './location.service'
import { Observable } from 'rxjs/Observable';
import { GoogleMapsAPIWrapper, AgmMap, LatLngBounds, LatLngBoundsLiteral} from '@agm/core';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  loading = false;
  loading_batch = false;
  public myip;
  public map;
  public lat;
  public lng;
  public ipList;
  public markers = [];

  /* Styles from https://snazzymaps.com/style/151/ultra-light-with-labels */
  style = [
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e9e9e9"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dedede"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#333333"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            }
        ];

  constructor(private _locationService: LocationService) { }

  ngOnInit() {
    this.getMyLocation();
  }

  getMyLocation() {
    this.loading = true;
    this._locationService.getMyLocation().subscribe(
        data => {
            console.log(data);
            this.myip = data['ip'],
            this.lat = data['latitude'],
            this.lng = data['longitude'],
            this.loading = false
        }
    );
  }

/*

For testing:

162.255.119.250
94.177.232.57
87.219.187.154

*/
  ngAfterViewInit() {
    console.log(this.agmMap);
    this.agmMap.mapReady.subscribe(map => {
        console.log('Get the map!');
        this.map = map;
    });
  }

  @ViewChild('AgmMap') agmMap: AgmMap;
  
  proccessIPList() {
    this.loading_batch = true;
    const bounds: LatLngBounds = new google.maps.LatLngBounds();

    this._locationService.getLocations(this.ipList.split('\n')).subscribe(
            data => {
                console.log(data);
                this.loading_batch = false;
                this.markers = data;
                for (let i = 0; i < data.length; i++) {
                    bounds.extend(new google.maps.LatLng(data[i]['latitude'], data[i]['longitude']));
                    this.map.fitBounds(bounds);
                }
            }
        );
  }

  reset() {
    this.markers = [];
  }
}
