import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Router } from '@angular/router';
import { BaselocalService } from './services/baselocal.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor( private platform: Platform,
               private router: Router,
               public datos: BaselocalService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //
      this.datos.logeado = false;
      //
    });
  }

  logout() {
      //
      this.datos.logeado = false;
      this.router.navigate(['/home']);      
      //
  }

}
