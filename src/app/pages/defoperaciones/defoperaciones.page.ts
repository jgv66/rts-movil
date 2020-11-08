import { Component, OnInit } from '@angular/core';
import { BaselocalService } from '../../services/baselocal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-defoperaciones',
  templateUrl: './defoperaciones.page.html',
  styleUrls: ['./defoperaciones.page.scss'],
})
export class DefoperacionesPage implements OnInit {

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
