import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  loader: any;

  constructor(  private platform: Platform,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private toastCtrl: ToastController ) {}

  textoSaludo() {
    const dia   = new Date();
    if ( dia.getHours() >= 8  && dia.getHours() < 12 ) {
      return 'buenos días ';
    } else if ( dia.getHours() >= 12 && dia.getHours() < 19 ) {
      return 'buenas tardes ';
    } else {
      return 'buenas noches '; }
  }

  async cargaEspera( milisegundos? ) {
    this.loader = await this.loadingCtrl.create({
      duration: ( milisegundos != null && milisegundos !== undefined ? milisegundos : 3000 )
      });
    await this.loader.present();
  }
  descargaEspera() {
    this.loader.dismiss();
  }

  hideTabs() {
    let estilo = '';
    // tslint:disable-next-line: no-angle-bracket-type-assertion tslint:disable-next-line: whitespace
    const elem   = <HTMLElement>document.querySelector('.tabbar');
    if (elem != null) {
      estilo             = elem.style.display;  // se guarda
      elem.style.display = 'none';              // se anula
    }
    return estilo;
  }
  showTabs( estilo ) {
    // tslint:disable-next-line: no-angle-bracket-type-assertion tslint:disable-next-line: whitespace
    const elem = <HTMLElement>document.querySelector('.tabbar');
    if (elem != null) {
      elem.style.display = estilo;
    }
  }

  async msgAlert( titulo, texto ) {
    const alert = await this.alertCtrl.create({
      // header: titulo,
      mode: 'md',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }
  async msgAlertErr( texto ) {
    const alert = await this.alertCtrl.create({
      cssClass: 'alertaError',
      mode: 'md',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }
  async muestraySale( cTexto, segundos, posicion?, color? ) {
    const toast = await this.toastCtrl.create({
      message: cTexto,
      duration: 1500 * segundos,
      position: posicion || 'middle',
      color: ( color ) ? color : 'danger'
    });
    toast.present();
  }

  /*| Platform Name   | Description                        |
  * |-----------------|------------------------------------|
  * | android         | on a device running Android.       |
  * | cordova         | on a device running Cordova.       |
  * | ios             | on a device running iOS.           |
  * | ipad            | on an iPad device.                 |
  * | iphone          | on an iPhone device.               |
  * | phablet         | on a phablet device.               |
  * | tablet          | on a tablet device.                |
  * | electron        | in Electron on a desktop device.   |
  * | pwa             | as a PWA app.                      |
  * | mobile          | on a mobile device.                |
  * | mobileweb       | on a mobile device in a browser.   |
  * | desktop         | on a desktop device.               |
  * | hybrid          | is a cordova or capacitor app.     |*/
  soyGrande() {
    if ( this.platform.is('ipad') || this.platform.is('tablet') ) {
      return true;
    } else {
      return false;
    }
  }

}
