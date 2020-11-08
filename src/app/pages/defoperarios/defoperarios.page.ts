import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaselocalService } from '../../services/baselocal.service';
import { NetworkengineService } from '../../services/networkengine.service';
import { FuncionesService } from '../../services/funciones.service';
import { ModalController } from '@ionic/angular';
import { DefoperarioPage } from '../defoperario/defoperario.page';

@Component({
  selector: 'app-defoperarios',
  templateUrl: './defoperarios.page.html',
  styleUrls: ['./defoperarios.page.scss'],
})
export class DefoperariosPage implements OnInit {

  buscando = false;
  operarios = [];

  constructor( private router: Router,
               private datos: BaselocalService,
               private netWork: NetworkengineService,
               private funciones: FuncionesService,
               private modalCtrl: ModalController ) { }

  ngOnInit() {
    if ( this.datos.user.id === 0 || this.datos.user.id === undefined ) {
      this.router.navigate(['/home']);
    }
    this.cargaOperarios();
  }

  salir() {
    this.router.navigate(['/inicio']);
  }

  doRefresh( event ) {
    this.cargaOperarios( event );
  }

  cargaOperarios( event? ) {
    this.buscando = true;
    this.netWork.comWithServer('operarios', { accion: 'select', idusuario: this.datos.user.id } )
      .subscribe( (data: any) => {
        //
        this.buscando = false;
        // console.log(data);
        //
        try {
          if ( data.resultado !== 'ok' ) {
              this.funciones.msgAlertErr('No existen operarios definidos.' );
          } else {
            this.operarios = data.datos;
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

  async tratOperario( crear: boolean, operario? ) {
    // console.log(crear, operario);
    const modal = await this.modalCtrl.create({
      component: DefoperarioPage,
      componentProps: { crear, oper: operario }
    });
    await modal.present();
    // el retorno
    const { data } = await modal.onWillDismiss();
    if ( data ) {
      this.cargaOperarios();
    }
  }

}
