import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthService } from '../auth/auth.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private geolocation: Geolocation, private authService: AuthService, private router: Router) {
    
  }

  latitude = 0
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      console.log(data)

    });
    return this.latitude
  }

}
