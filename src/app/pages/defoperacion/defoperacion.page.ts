import { Component, OnInit, Input } from '@angular/core';
import { FuncionesService } from '../../services/funciones.service';
import { BaselocalService } from '../../services/baselocal.service';
import { AlertController, ModalController } from '@ionic/angular';
import { NetworkengineService } from '../../services/networkengine.service';

@Component({
  selector: 'app-defoperacion',
  templateUrl: './defoperacion.page.html',
  styleUrls: ['./defoperacion.page.scss'],
})
export class DefoperacionPage implements OnInit {

  @Input() crear: boolean;
  @Input() oper: any;
  //
  buscando = false;
  proceso = '';
  descripcion   = '';
  //
  accion = '';
  //
  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private netWork: NetworkengineService,
              public datos: BaselocalService,
              private funciones: FuncionesService ) {}

  ngOnInit() {
    if ( this.crear === false ) {
      this.descripcion = this.oper.descripcion;
    }
    this.accion = ( this.crear === true ) ? 'crear' : 'actualizar' ;
    console.log(this.oper);
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  async borrarOperacion() {
    const alert = await this.alertCtrl.create({
      subHeader: 'Esta operacion será eliminada del sistema. Continúa?',
      buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {}
      }, {
        text: 'Sí, borrar',
        handler: () => { this.accion = 'borrar';
                         this.actualizar(); }
      }
      ]
    });
    await alert.present();
  }

  actualizar() {
    //
    if ( this.crear === true && ( this.proceso === '' || this.descripcion === '' ) ) {
      this.funciones.msgAlertErr( 'Debe completar datos obligatorios de Código de Operación y su descripción.' );
      return;
    }
    //
    const data = {
      accion:      this.accion,
      proceso:     ( this.crear === true ) ? this.proceso : this.oper.proceso,
      descripcion: this.descripcion,
    };
    //
    if ( data ) {
      // console.log(data);
      switch (data.accion) {
        case 'actualizar':
          this.efecto( data, 'update' );
          break;
        case 'crear':
          this.efecto( data, 'insert' );
          break;
        case 'borrar':
          this.efecto( data, 'delete' );
          break;
        default:
          break;
      }
    }
  }

  efecto( data, movimiento ) {
    // console.log('efecto', movimiento, data);
    this.buscando = true;
    this.netWork.comWithServer('procesos',
                               { accion: movimiento,
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
