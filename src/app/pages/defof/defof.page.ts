import { Component, OnInit } from '@angular/core';
import { BaselocalService } from '../../services/baselocal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-defof',
  templateUrl: './defof.page.html',
  styleUrls: ['./defof.page.scss'],
})
export class DefofPage implements OnInit {

  constructor( private router: Router,
               private datos: BaselocalService ) { }

  ngOnInit() {
    if ( this.datos.user.id === 0 || this.datos.user.id === undefined ) {
      this.router.navigate(['/home']);
    }
  }

  salir() {
    this.router.navigate(['/inicio']);
  }

}
