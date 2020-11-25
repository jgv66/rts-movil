import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaselocalService } from '../../services/baselocal.service';
import { NetworkengineService } from '../../services/networkengine.service';
import { FuncionesService } from '../../services/funciones.service';
import { ModalController } from '@ionic/angular';
import { ProdtermingPage } from '../prodterming/prodterming.page';

@Component({
  selector: 'app-prodterm',
  templateUrl: './prodterm.page.html',
  styleUrls: ['./prodterm.page.scss'],
})
export class ProdtermPage implements OnInit {

  buscando = false;
  terminados = [];

  constructor( private router: Router,
               private datos: BaselocalService,
               private netWork: NetworkengineService,
               private funciones: FuncionesService,
               private modalCtrl: ModalController ) { }

  ngOnInit() {
    if ( this.datos.user.id === 0 || this.datos.user.id === undefined ) {
      this.router.navigate(['/home']);
    }
    this.cargaTerminados();
  }

  salir() {
    this.router.navigate(['/inicio']);
  }

  doRefresh( event ) {
    this.cargaTerminados( event );
  }

  cargaTerminados( event? ) {
    this.buscando = true;
    this.netWork.comWithServer('terminados', { accion: 'select', idusuario: this.datos.user.id } )
      .subscribe( (data: any) => {
        //
        this.buscando = false;
        // console.log(data);
        //
        try {
          if ( data.resultado !== 'ok' ) {
              this.funciones.msgAlertErr('No existen Productos terminados.' );
          } else {
            this.terminados = data.datos;
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

  async tratOperario( crear: boolean, terminado? ) {
    // console.log(crear, operario);
    const modal = await this.modalCtrl.create({
      component: ProdtermingPage,
      componentProps: { crear, producto: terminado }
    });
    await modal.present();
    // el retorno
    const { data } = await modal.onWillDismiss();
    if ( data ) {
      this.cargaTerminados();
    }
  }

}
