import { Component } from '@angular/core';
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

  agregando = false;
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
    this.agregando = true;
    this.netWork.comWithServer('ordenesSoft',
                               { accion: 'select',
                                 idusuario: this.datos.user.id,
                                 datos: JSON.stringify({nvv: this.nvv})
                               } )
      .subscribe( (data: any) => {
        //
        this.agregando = false;
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

  trasladar( data ) {
    // this.modalCtrl.dismiss({ nvv });
    this.agregando = false;
    const dato = {
      accion: 'insert',
      nvv: data
    };
    //
    this.agregando = true;
    this.netWork.comWithServer('ordenes',
                                { accion: 'insert',
                                  idusuario: this.datos.user.id,
                                  datos: JSON.stringify(dato) } )
      .subscribe( (resp: any) => {
        //
        this.agregando = false;
        //
        try {
          if ( resp.resultado !== true ) {
            this.funciones.msgAlertErr('Ocurrió un error al intentar grabar. ' + resp.datos );
          } else {
            this.funciones.muestraySale( 'Ingresada correctamente', 1, 'middle' );
            this.nvv = undefined;
            // this.modalCtrl.dismiss({resultado: 'ok' });
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

