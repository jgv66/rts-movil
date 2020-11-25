import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaselocalService } from '../../services/baselocal.service';
import { NetworkengineService } from '../../services/networkengine.service';
import { FuncionesService } from '../../services/funciones.service';
import { ModalController } from '@ionic/angular';
import { DefoperacionPage } from '../defoperacion/defoperacion.page';

@Component({
  selector: 'app-defoperaciones',
  templateUrl: './defoperaciones.page.html',
  styleUrls: ['./defoperaciones.page.scss'],
})
export class DefoperacionesPage implements OnInit {

  buscando = false;
  operaciones = [];

  constructor( private router: Router,
               private datos: BaselocalService,
               private netWork: NetworkengineService,
               private funciones: FuncionesService,
               private modalCtrl: ModalController ) { }

  ngOnInit() {
    if ( this.datos.user.id === 0 || this.datos.user.id === undefined ) {
      this.router.navigate(['/home']);
    }
    this.cargaOperaciones();
  }

  salir() {
    this.router.navigate(['/inicio']);
  }

  doRefresh( event ) {
    this.cargaOperaciones( event );
  }

  cargaOperaciones( event? ) {
    this.buscando = true;
    this.netWork.comWithServer('procesos', { accion: 'select', idusuario: this.datos.user.id } )
      .subscribe( (data: any) => {
        //
        this.buscando = false;
        try {
          if ( data.resultado !== 'ok' ) {
              this.funciones.msgAlertErr('No existen operaciones definidas.' );
          } else {
            this.operaciones = data.datos;
            if ( event !== undefined ) {
              event.target.complete();
            }
          }
        } catch (err) {
          this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
        }
      },
      err => {
        this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
      });
  }

  async tratOperaciones( crear: boolean, operacion? ) {
    // console.log(crear, operario);
    const modal = await this.modalCtrl.create({
      component: DefoperacionPage,
      componentProps: { crear, oper: operacion }
    });
    await modal.present();
    // el retorno
    const { data } = await modal.onWillDismiss();
    if ( data ) {
      this.cargaOperaciones();
    }
  }

}
