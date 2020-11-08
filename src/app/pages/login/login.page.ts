import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BaselocalService } from '../../services/baselocal.service';
import { FuncionesService } from '../../services/funciones.service';
import { NetworkengineService } from '../../services/networkengine.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email;
  clave;
  buscando = false;

  constructor(private router: Router,
              public baseLocal: BaselocalService,
              private funciones: FuncionesService,
              private netWork: NetworkengineService) {}

  ngOnInit() {
    this.baseLocal.inicializaTodo();
    this.baseLocal.obtenUltimoUsuario()
      .then( pUsuario => {
        try {
          this.email = pUsuario.email;
        } catch (error) {
          this.email = null;
        }
      })
      .catch( err => console.log( 'Lectura de usuario con error->', err ) );
  }

  salir() {
    this.baseLocal.inicializaTodo();
    this.router.navigate(['/home']);
  }

  logearme() {
    if ( this.email === '' || this.email === null || this.clave === '' || this.clave === null ) {
      this.funciones.msgAlertErr( 'Debe indicar usuario y clave para ingresar.');
    } else {
      const pssw = window.btoa( this.clave );
      // console.log(this.miClave, pssw);
      this.buscando = true;
      this.netWork.comWithServer('usuarios',
                                  { accion: 'select',
                                    email: this.email,
                                    pssw,
                                    codigo: this.email,
                                    nombre: this.email } )
          .subscribe( data => { this.revisaExitooFracaso( data ); },
                      err  => { this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err ); }
                    );
    }
  }
  revisaExitooFracaso( data ) {
    // console.log(data);
    this.buscando = false;
    if ( data.resultado !== 'ok' ) {
        this.funciones.msgAlertErr('Los datos ingresados no coinciden con usuarios registrados. ' );
    } else {
      // console.log( data.datos[0] );
      this.funciones.muestraySale( 'Hola ' + data.datos[0].nombre.trim() + ', ' + this.funciones.textoSaludo(), 0.7 );
      //
      this.baseLocal.guardaUltimoUsuario( data.datos[0] );
      this.baseLocal.logeado = true;
      //
      this.router.navigate(['/inicio']);
    }
  }

}
