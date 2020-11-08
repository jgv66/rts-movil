import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaselocalService } from 'src/app/services/baselocal.service';

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.page.html',
  styleUrls: ['./produccion.page.scss'],
})
export class ProduccionPage implements OnInit {

  constructor( private router: Router,
               private datos: BaselocalService) { }

  ngOnInit() {
    if ( this.datos.user.id === 0 || this.datos.user.id === undefined ) {
      this.router.navigate(['/home']);
    }
  }

  salir() {
    this.router.navigate(['/inicio']);
  }

}
