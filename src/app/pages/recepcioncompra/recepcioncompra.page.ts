import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { BaselocalService } from '../../services/baselocal.service';
import { NetworkengineService } from '../../services/networkengine.service';
import { FuncionesService } from '../../services/funciones.service';

import { RevisarocPage } from '../revisaroc/revisaroc.page';
import { EncursoPage } from '../encurso/encurso.page';

@Component({
  selector: 'app-recepcioncompra',
  templateUrl: './recepcioncompra.page.html',
  styleUrls: ['./recepcioncompra.page.scss'],
})
export class RecepcioncompraPage implements OnInit {

  buscando = false;
  ordenes = [];

  constructor( private router: Router,
               private datos: BaselocalService,
               private netWork: NetworkengineService,
               private funciones: FuncionesService,
               private alertCtrl: AlertController,
               private modalCtrl: ModalController ) { }

  ngOnInit() {
    if ( this.datos.user.id === 0 || this.datos.user.id === undefined ) {
      this.router.navigate(['/home']);
    }
    this.cargaOC();
  }

  salir() {
    this.router.navigate(['/inicio']);
  }

  doRefresh( event ) {
    this.cargaOC( event );
  }

  cargaOC( event? ) {
    this.buscando = true;
    this.netWork.comWithServer('ordenesdecompra', { accion: 'select', idusuario: this.datos.user.id } )
      .subscribe( (data: any) => {
        //
        this.buscando = false;
        console.log(data);
        //
        try {
          if ( data.resultado !== 'ok' || data.datos.length === 0 ) {
              this.funciones.msgAlertErr('No existen OC pendientes de recibir.' );
          } else {
            this.ordenes = data.datos;
          }
          if ( event !== undefined ) {
            event.target.complete();
          }
        } catch (err) {
          this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
        }
      },
      err => {
        this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
      });
  }

  async verDetalle( orden ) {
    const modal = await this.modalCtrl.create({
      component: RevisarocPage,
      componentProps: { orden },
      cssClass: ( this.funciones.soyGrande() === true ? 'mi-modal-mas-alto-css' : undefined ),
    });
    await modal.present();
    // el retorno
    const { data } = await modal.onWillDismiss();
    if ( data ) {
      // this.cargaOC();
    }
  }

  async recibirOC( orden ) {
    //
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Recepción #'+ orden.numero,
      mode: 'ios',
      message: 'Desea trabajar en esta recepción?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Sí',
          handler: () => {
            this.trabajarRecepcion( orden.numero );
          }
        }
      ]
    });
    await alert.present();
  }

  async trabajarRecepcion( numero:any ) {
    //
    await this.datos.guardarDato( 'recepcion_activa', numero );
    const modal = await this.modalCtrl.create({
      component: EncursoPage,
      componentProps: { numero }
    });
    await modal.present();
    //
  }  

}
