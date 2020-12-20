import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSegment, ModalController } from '@ionic/angular';
import { BaselocalService } from '../../services/baselocal.service';
import { NetworkengineService } from '../../services/networkengine.service';
import { FuncionesService } from '../../services/funciones.service';
import { DefofdetPage } from '../defofdet/defofdet.page';
import { AddofPage } from '../addof/addof.page';
import { BehaviorSubject } from 'rxjs';

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
  }

  cargaEstatus() {
    this.buscando = true;
    this.netWork.comWithServer('estatus', { accion: 'select', idusuario: this.datos.user.id } )
      .subscribe( (data: any) => {
        //
        // console.log(data);
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
      componentProps: { facilitador: this.datos.user.id }
    });

    await modal.present();
    //
    const { data } = await modal.onWillDismiss();
    if ( data ) {
      this.cargaOrdenes();
    }
  }

  cargaOrdenes( event? ) {
    this.buscando = true;
    this.netWork.comWithServer('ordenes', { accion: 'select', idusuario: this.datos.user.id } )
      .subscribe( (data: any) => {
        //
        this.buscando = false;
        // console.log(data);
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

  async definirOF(nv) {
    //
    const modal = await this.modalCtrl.create({
      component: DefofdetPage,
      cssClass: ( this.funciones.soyGrande() === true ? 'mi-modal-mas-alto-css' : undefined ),
      componentProps: { orden: nv }
    });
    await modal.present();
    //
    const { data } = await modal.onWillDismiss();
    if ( data ) {
      this.cargaOrdenes();
    }
  //
  }

}
