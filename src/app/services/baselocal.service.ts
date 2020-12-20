import { Injectable } from '@angular/core';
import { Usuario, Cliente } from '../models/modelos.modelo';
import { Plugins } from '@capacitor/core';
import { NetworkengineService } from './networkengine.service';
import { FuncionesService } from './funciones.service';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class BaselocalService {

  user: Usuario;
  cliente: Cliente;
  logeado = false;
  //
  operarios = [];
  mecanicos = [];
  maquinas = [];
  procesos = [];

  constructor( private netWork: NetworkengineService ) {
    console.log('<<< BaseLocalProvider >>>');
    this.inicializaTodo();
  }

  initUsuario() {
    this.user = {
      id:      0,   // codigo de usuario
      rut:     null,
      email:   null,
      nombre:  null,
      cargo:   null,
      esadmin: false };
    return;
  }

  initCliente() {
    this.cliente = {
      id:          0,
      codigo:      '',
      razonsocial: ''};
    return;
  }

  inicializaTodo() {
    this.logeado = false;
    this.initUsuario();
    this.initCliente();
  }

  async guardaUltimoUsuario( data ) {
    this.user = data;
    await Storage.set( { key: 'k_rts_uu', value: JSON.stringify(this.user) } );
  }

  async obtenUltimoUsuario() {
    const ret  = await Storage.get( { key: 'k_rts_uu' });
    const user = JSON.parse( ret.value );
    this.user = ( user ? user : null );
    return this.user;
  }

  getMaquinas() {
    this.netWork.comWithServer('maquinas', { accion: 'select', idusuario: this.user.id } )
      .subscribe( (data: any) => {
        //
        console.log(data);
        //
        try {
          if ( data.resultado !== 'ok' || data.datos.length === 0 ) {
              // this.funciones.msgAlertErr('No existen máquinas definidas.' );
          } else {
            this.maquinas = data.datos;
          }
        } catch (err) {
          // this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
        }
      },
      err => {
        // this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
      });
  }

  getOperarios() {
    this.netWork.comWithServer('operarios', { accion: 'select', idusuario: this.user.id } )
      .subscribe( (data: any) => {
        //
        // console.log(data);
        //
        try {
          if ( data.resultado !== 'ok' || data.datos.length === 0 ) {
              // this.funciones.msgAlertErr('No existen máquinas definidas.' );
          } else {
            this.operarios = data.datos;
            this.mecanicos = data.datos.filter( element => element.esmecanico === true );
          }
        } catch (err) {
          // this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
        }
      },
      err => {
        // this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
      });
  }

  getProcesos() {
    this.netWork.comWithServer('procesos', { accion: 'select', idusuario: this.user.id } )
      .subscribe( (data: any) => {
        //
        // console.log(data);
        //
        try {
          if ( data.resultado !== 'ok' || data.datos.length === 0 ) {
              // this.funciones.msgAlertErr('No existen máquinas definidas.' );
          } else {
            this.procesos = data.datos;
          }
        } catch (err) {
          // this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
        }
      },
      err => {
        // this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
      });
  }

}
