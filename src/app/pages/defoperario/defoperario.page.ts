import { Component, OnInit, Input } from '@angular/core';
import { FuncionesService } from '../../services/funciones.service';
import { BaselocalService } from '../../services/baselocal.service';
import { AlertController, ModalController } from '@ionic/angular';
import { NetworkengineService } from '../../services/networkengine.service';

@Component({
  selector: 'app-defoperario',
  templateUrl: './defoperario.page.html',
  styleUrls: ['./defoperario.page.scss'],
})
export class DefoperarioPage implements OnInit {

  @Input() crear: boolean;
  @Input() oper: any;
  //
  buscando = false;
  operario = '';
  nombre   = '';
  activo   = true;
  ingreso  = new Date();
  genero   = '';
  esmaestro = '';
  esmecanico = '';
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
      console.log(this.oper);
      this.nombre     = this.oper.nombre;
      this.activo     = this.oper.activo;
      this.ingreso    = this.oper.ingreso;
      this.genero     = (this.oper.genero === 'F' ? 'Femenino' : 'Masculino' );
      this.esmaestro  = (this.oper.esmaestro === true  ? 'Maestro' : 'Ayudante' );
      this.esmecanico = (this.oper.esmecanico === true ? 'Sí' : 'No' );
    }
    this.accion = ( this.crear === true ) ? 'crear' : 'actualizar' ;
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  async borrarOperario() {
    const alert = await this.alertCtrl.create({
      subHeader: 'Este operario será eliminado del sistema. Continúa?',
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
    if ( this.crear === true && ( this.operario === '' || this.nombre === '' ) ) {
      this.funciones.msgAlertErr( 'Debe completar datos obligatorios de Código de Operario y su Nombre.' );
      return;
    }
    //
    const data = {
      accion:     this.accion,
      operario:   ( this.crear === true ) ? this.operario : this.oper.operario,
      nombre:     this.nombre,
      activo:     this.activo,
      ingreso:    this.ingreso,
      genero:     this.genero.substring(0, 1),
      esmaestro:  ( this.esmaestro  === 'Maestro' ? true : false ),
      esmecanico: ( this.esmecanico === 'Sí' ? true : false )
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
    this.netWork.comWithServer('operarios',
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
