import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FuncionesService } from '../../services/funciones.service';
import { NetworkengineService } from '../../services/networkengine.service';
import { BaselocalService } from '../../services/baselocal.service';

@Component({
  selector: 'app-addof',
  templateUrl: './addof.page.html',
  styleUrls: ['./addof.page.scss'],
})
export class AddofPage {

  buscando = false;
  notas = [];
  nvv = '';

  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private netWork: NetworkengineService,
              public datos: BaselocalService,
              private funciones: FuncionesService ) {}

  salir() {
    this.modalCtrl.dismiss();
  }

  aBuscarNotaDeVenta( event ) {
    //
    this.buscando = true;
    this.netWork.comWithServer('ordenesSoft',
                               { accion: 'select',
                                 idusuario: this.datos.user.id,
                                 datos: JSON.stringify({nvv: this.nvv})
                               } )
      .subscribe( (data: any) => {
        //
        this.buscando = false;
        console.log(data);
        //
        try {
          if ( data.resultado !== 'ok' ) {
              this.funciones.msgAlertErr('No existen Órdenes de fabricación definidas.' );
          } else {
            //
            this.notas = data.datos;
          }
          //
          // if ( event !== undefined ) {
          //   event.target.complete();
          // }
        } catch (err) {
          this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
        }
      },
      err  => {
        this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
      });
  }

  trasladar( nvv ) {
    this.modalCtrl.dismiss({ nvv });
  }
}
