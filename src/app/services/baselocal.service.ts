import { Injectable } from '@angular/core';
import { Usuario, Cliente } from '../models/modelos.modelo';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class BaselocalService {

  user: Usuario;
  cliente: Cliente;
  logeado = false;

  constructor() {
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

}
