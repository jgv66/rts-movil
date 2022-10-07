import { Injectable } from '@angular/core';
import { Usuario, Cliente } from '../models/modelos.modelo';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@capacitor/storage';
import { environment } from '../../environments/environment';

import { NetworkengineService } from './networkengine.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BaselocalService {

  
  url = environment.URL;
  user: Usuario;
  cliente: Cliente;
  logeado = false;
  //
  operarios = [];
  mecanicos = [];
  maquinas  = [];
  procesos  = [];
  //
  constructor(  private netWork: NetworkengineService, 
                private http: HttpClient,
                private toastCtrl: ToastController ) {
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

  // set a key/value
  async guardarDato( key, value ) {
    await Storage.set({ key, value });
  }

  async leerDato( key ) {
    const { value } = await Storage.get({ key });
    return value;
  }

  async existeConteo( id:number ) {
    const { value } = await Storage.get({ key: 'conteo_'+id.toString() });
    return ( value === undefined );
  }

  async removeConteo( id:number ) {
    await Storage.remove({ key: 'conteo_'+id.toString() });
  }

  uploadImageBlob(blobData, name, ext, idPaquete) {
    //
    const url = this.url + '/imgUp';
    //
    const formData = new FormData();
    formData.append('kfoto', blobData, name );
    formData.append('name',      name);
    formData.append('extension', ext);
    formData.append('id_pqt',    idPaquete );    
    //
    return this.http.post( url, formData );
    //
  }

  // Helper function
  // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


}
