import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaselocalService } from '../../services/baselocal.service';
import { NetworkengineService } from '../../services/networkengine.service';
import { FuncionesService } from '../../services/funciones.service';
import { ModalController } from '@ionic/angular';
import { DefestatPage } from '../defestat/defestat.page';

@Component({
  selector: 'app-defestatus',
  templateUrl: './defestatus.page.html',
  styleUrls: ['./defestatus.page.scss'],
})
export class DefestatusPage implements OnInit {

  buscando = false;
  estatus = [];

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
  }

  salir() {
    this.router.navigate(['/inicio']);
  }

  doRefresh( event ) {
    this.cargaEstatus( event );
  }

  cargaEstatus( event? ) {
    this.buscando = true;
    this.netWork.comWithServer('estatus', { accion: 'select', idusuario: this.datos.user.id } )
      .subscribe( (data: any) => {
        //
        this.buscando = false;
        try {
          if ( data.resultado !== 'ok' ) {
              this.funciones.msgAlertErr('No existen estatus definidos.' );
          } else {
            this.estatus = data.datos;
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

  async tratEstatus( crear: boolean, stat? ) {
    // console.log(crear, operario);
    const modal = await this.modalCtrl.create({
      component: DefestatPage,
      componentProps: { crear, oper: stat }
    });
    await modal.present();
    // el retorno
    const { data } = await modal.onWillDismiss();
    if ( data ) {
      this.cargaEstatus();
    }
  }

}
