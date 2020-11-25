import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaselocalService } from '../../services/baselocal.service';
import { NetworkengineService } from '../../services/networkengine.service';
import { FuncionesService } from '../../services/funciones.service';
import { ModalController } from '@ionic/angular';
import { TmldetPage } from '../tmldet/tmldet.page';

@Component({
  selector: 'app-tml',
  templateUrl: './tml.page.html',
  styleUrls: ['./tml.page.scss'],
})
export class TmlPage implements OnInit {

  buscando = false;
  tiempos = [];

  constructor( private router: Router,
               private datos: BaselocalService,
               private netWork: NetworkengineService,
               private funciones: FuncionesService,
               private modalCtrl: ModalController ) { }

  ngOnInit() {
    if ( this.datos.user.id === 0 || this.datos.user.id === undefined ) {
      this.router.navigate(['/home']);
    }
    this.cargaTML();
    this.datos.getMaquinas();
    this.datos.getOperarios();
  }

  salir() {
    this.router.navigate(['/inicio']);
  }

  doRefresh( event ) {
    this.cargaTML( event );
  }

  cargaTML( event? ) {
    this.buscando = true;
    this.netWork.comWithServer('tml', { accion: 'select', idusuario: this.datos.user.id } )
      .subscribe( (data: any) => {
        //
        this.buscando = false;
        console.log(data);
        //
        try {
          if ( data.resultado !== 'ok' || data.datos.length === 0 ) {
              this.funciones.msgAlertErr('No existen TML definidos.' );
          } else {
            this.tiempos = data.datos;
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

  async tratTML( crear: boolean, tiempo? ) {
    // console.log(crear, operario);
    const modal = await this.modalCtrl.create({
      component: TmldetPage,
      componentProps: { crear, tiempo },
      // cssClass: 'miModal'
    });
    await modal.present();
    // el retorno
    const { data } = await modal.onWillDismiss();
    if ( data ) {
      this.cargaTML();
    }
  }

}
