import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FuncionesService } from '../../services/funciones.service';
import { NetworkengineService } from '../../services/networkengine.service';
import { BaselocalService } from '../../services/baselocal.service';

@Component({
  selector: 'app-defestat',
  templateUrl: './defestat.page.html',
  styleUrls: ['./defestat.page.scss'],
})
export class DefestatPage implements OnInit {

  @Input() crear: boolean;
  @Input() oper: any;
  //
  buscando = false;
  estatus = '';
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

  async borrarEstatus() {
    const alert = await this.alertCtrl.create({
      subHeader: 'Este estatus será eliminado del sistema. Continúa?',
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
    if ( this.crear === true && ( this.estatus === '' || this.descripcion === '' ) ) {
      this.funciones.msgAlertErr( 'Debe completar datos obligatorios de Código de Estatus y su descripción.' );
      return;
    }
    //
    const data = {
      accion:      this.accion,
      estatus:     ( this.crear === true ) ? this.estatus : this.oper.proceso,
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
    console.log('efecto', movimiento, data);
    this.buscando = true;
    this.netWork.comWithServer('estatus',
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
