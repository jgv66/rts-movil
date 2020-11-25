import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaselocalService } from '../../services/baselocal.service';
import { NetworkengineService } from '../../services/networkengine.service';
import { FuncionesService } from '../../services/funciones.service';
import { ModalController } from '@ionic/angular';
import { DefofdetPage } from '../defofdet/defofdet.page';
import { AddofPage } from '../addof/addof.page';

@Component({
  selector: 'app-defof',
  templateUrl: './defof.page.html',
  styleUrls: ['./defof.page.scss'],
})
export class DefofPage implements OnInit {

  buscando = false;
  ordenes = [];
  backdropVisible = false;

  constructor( private changeDetectorRef: ChangeDetectorRef,
               private router: Router,
               private datos: BaselocalService,
               private netWork: NetworkengineService,
               private funciones: FuncionesService,
               private modalCtrl: ModalController ) { }

  toggleBackdrop(isVisible) {
    this.backdropVisible = isVisible;
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    if ( this.datos.user.id === 0 || this.datos.user.id === undefined ) {
      this.router.navigate(['/home']);
    }
    this.cargaOrdenes();
  }

  salir() {
    this.router.navigate(['/inicio']);
  }

  doRefresh( event ) {
    this.cargaOrdenes( event );
  }

  cargaOrdenes( event? ) {
    let i = 0;
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

  async tratOrdenes( crear: boolean, orden ) {
    const modal = await this.modalCtrl.create({
      component: DefofdetPage,
      componentProps: { crear, orden }
    });
    await modal.present();
    // el retorno
    const { data } = await modal.onWillDismiss();
    if ( data ) {
      // console.log(data);
      this.cargaOrdenes();
    }
  }

  async agregarOF() {
    const modal = await this.modalCtrl.create({
      component: AddofPage
    });
    await modal.present();
    // el retorno
    const { data } = await modal.onWillDismiss();
    if ( data ) {
      console.log(data);
      this.insertar( data );
    }
  }

  insertar( nvv ) {
    //
    const data = {
      accion: 'insert',
      nvv
    };
    // console.log('efecto', movimiento, data);
    this.buscando = true;
    this.netWork.comWithServer('procesos',
                               { accion: 'insert',
                                 idusuario: this.datos.user.id,
                                 datos: JSON.stringify(data) } )
      .subscribe( (resp: any) => {
        //
        this.buscando = false;
        //
        try {
          if ( resp.resultado !== 'ok' ) {
            this.funciones.msgAlertErr('Ocurrió un error al intentar grabar. ' + resp.datos );
          } else {
            this.funciones.muestraySale( 'Solicitud exitosa.', 1, 'middle' );
            this.modalCtrl.dismiss({resultado: 'ok' });
          }
        } catch (err) {
          this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
        }
      },
      err  => {
        this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
      });
  }

}
