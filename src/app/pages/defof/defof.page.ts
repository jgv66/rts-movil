import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSegment, ModalController, AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { BaselocalService } from '../../services/baselocal.service';
import { NetworkengineService } from '../../services/networkengine.service';
import { FuncionesService } from '../../services/funciones.service';
import { DefofdetPage } from '../defofdet/defofdet.page';
import { AddofPage } from '../addof/addof.page';
import { VerdataofPage } from '../verdataof/verdataof.page';

@Component({
  selector: 'app-defof',
  templateUrl: './defof.page.html',
  styleUrls: ['./defof.page.scss'],
})
export class DefofPage implements OnInit {
  //
  @ViewChild( IonSegment,   {static: true} ) segment: IonSegment;
  @ViewChild( IonContent,   {static: true} ) content: IonContent;
  //
  segmento = 'A';
  buscando = false;
  ordenes = [];
  status = [];
  nombreSeg = new BehaviorSubject('');
  casosSeg = new BehaviorSubject(0);
  //
  constructor( private router: Router,
               private alertCtrl: AlertController,
               private datos: BaselocalService,
               private netWork: NetworkengineService,
               private funciones: FuncionesService,
               private modalCtrl: ModalController ) { }

  ngOnInit() {
    if ( this.datos.user.id === 0 || this.datos.user.id === undefined ) {
      this.router.navigate(['/home']);
    }
    this.cargaEstatus();
    this.cargaOrdenes();
    //
    this.datos.getMaquinas();
    this.datos.getOperarios();
    this.datos.getProcesos();
    //
  }

  cargaEstatus() {
    this.buscando = true;
    this.netWork.comWithServer('estatus', { accion: 'select', idusuario: this.datos.user.id } )
      .subscribe( (data: any) => {
        //
        this.buscando = false;
        try {
          if ( data.resultado === 'ok' ) {
            this.status = data.datos;
            this.nombreSegmento();
          }
        } catch (err) {
          this.status = [];
        }
      },
      err => {
        this.status = [];
      });
  }

  cargaOrdenes( event? ) {
    this.buscando = true;
    this.netWork.comWithServer('ordenes', { accion: 'select', idusuario: this.datos.user.id } )
      .subscribe( (data: any) => {
        //
        this.buscando = false;
        //
        try {
          if ( data.resultado !== 'ok' ) {
              this.funciones.msgAlertErr('No existen Órdenes de fabricación definidas.' );
          } else {
            //
            this.ordenes = data.datos;
            //
            this.nombreSegmento();
            this.casosSegmento();
            //
          }
          //
          if ( event !== undefined ) {
            event.target.complete();
          }
        } catch (err) {
          this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
        }
      },
      err  => {
        this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
      });
  }

  salir() {
    this.router.navigate(['/inicio']);
  }

  doRefresh( event ) {
    this.cargaOrdenes( event );
    this.segmento = 'A';
  }

  segmentChanged(event) {
    this.segmento = event.detail.value;
    this.nombreSegmento();
    this.casosSegmento();
  }

  nombreSegmento() {
    const resultado = this.status.find( x => x.estatus === this.segmento );
    this.nombreSeg.next(resultado.descripcion);
  }
  getNombre() {
    return this.nombreSeg.getValue();
  }
  casosSegmento() {
    let nCasos = 0;
    this.ordenes.forEach( (o) => {
      if ( o.estado === this.segmento ) {
        ++nCasos;
      }
      //
    });
    this.casosSeg.next(nCasos);
  }
  getCasos() {
    return this.casosSeg.getValue();
  }

  async agregarOF() {
    const modal = await this.modalCtrl.create({
      component: AddofPage,
      componentProps: { facilitador: this.datos.user.id },
      // cssClass: ( this.funciones.soyGrande() === true ? 'mi-modal-mas-alto-css' : undefined ),
    });
    await modal.present();
    //
    const { data } = await modal.onWillDismiss();
    if ( data ) {
      this.cargaOrdenes();
    }
  }

  async definirOF(nv) {
    //
    const modal = await this.modalCtrl.create({
      component: DefofdetPage,
      cssClass: ( this.funciones.soyGrande() === true ? 'mi-modal-mas-alto-css' : undefined ),
      componentProps: { facilitador: this.datos.user.id,
                        orden: nv,
                        opcion: this.segmento }
    });
    await modal.present();
    //
    const { data } = await modal.onWillDismiss();
    if ( data ) {
      // quizas se deba cargar solo la modificada.... no todas  20/12/2020
      this.cargaOrdenes();
    }
  //
  }

  async epCerrar( nv ) {
    const alert = await this.alertCtrl.create({
      cssClass: 'mi-alert-css',
      header: 'Confirmar',
      message: 'Esta Orden de Fabricación se dará por cerrada y quedará en estado <strong>Finalizadas</strong>. Confirma su decisión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Sí, confirmo',
          handler: () => {
            this.cambiarEstadoOF( nv, 'T' );
          }
        }
      ]
    });
    await alert.present();
  }
  async epDetener( nv ) {
    const alert = await this.alertCtrl.create({
      cssClass: 'mi-alert-css',
      header: 'Confirmar',
      message: 'Esta Orden de Fabricación se detendrá para los efectos productivos y quedará en estado <strong>Detenidas</strong>. Confirma su decisión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Sí, confirmo',
          handler: () => {
            this.cambiarEstadoOF( nv, 'S' );
          }
        }
      ]
    });
    await alert.present();
  }
  async epReiniciar( nv ) {
    const alert = await this.alertCtrl.create({
      cssClass: 'mi-alert-css',
      header: 'Confirmar',
      message: 'Esta Orden de Fabricación se reactivará para los efectos productivos y quedará en estado <strong>En Proceso</strong>. Confirma su decisión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Sí, confirmo',
          handler: () => {
            this.cambiarEstadoOF( nv, 'P' );
          }
        }
      ]
    });
    await alert.present();
  }
  cambiarEstadoOF(nv, estado) {
    this.buscando = true;
    this.netWork.comWithServer('ordenes',
                               {accion: 'cambiarestado',
                                idusuario: this.datos.user.id,
                                datos: JSON.stringify({ id: nv.id,
                                                        user: this.datos.user.id,
                                                        estado })
                               })
      .subscribe( (data: any) => {
        //
        this.buscando = false;
        //
        try {
          if ( data.resultado !== 'ok' ) {
              this.funciones.msgAlertErr('No existen Órdenes de fabricación definidas.' );
          } else {
            //
            nv.estado = estado;
            //
            this.nombreSegmento();
            this.casosSegmento();
            this.segmento = 'A';
            //
          }
        } catch (err) {
          this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
        }
      },
      err  => {
        this.buscando = false;
        this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
      });
  }

  async epReport(nv) {
    //
    const modal = await this.modalCtrl.create({
      component: VerdataofPage,
      cssClass: ( this.funciones.soyGrande() === true ? 'mi-modal-mas-alto-css' : undefined ),
      componentProps: { orden: nv }
    });
    await modal.present();
    //
  }
}
