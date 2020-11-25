import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BaselocalService } from '../../services/baselocal.service';
import { NetworkengineService } from '../../services/networkengine.service';
import { FuncionesService } from '../../services/funciones.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tmldet',
  templateUrl: './tmldet.page.html',
  styleUrls: ['./tmldet.page.scss'],
})
export class TmldetPage implements OnInit {

  @Input() crear: boolean;
  @Input() tiempo;

  accion      = '';
  facilitador = 0;
  buscando    = false;
  fecha: Date;
  turnos      = [];
  turno       = '';
  maquina     = '';
  nombremaq   = '';
  horaini     = '';
  horafin     = '';
  operador    = '';
  nombreoper  = '';
  ayudante1   = '';
  nombreayu1  = '';
  ayudante2   = '';
  nombreayu2  = '';
  mecanico    = '';
  nombremec   = '';
  descripcion = '';

  constructor( private router: Router,
               private alertCtrl: AlertController,
               private modalCtrl: ModalController,
               public datos: BaselocalService,
               private netWork: NetworkengineService,
               private funciones: FuncionesService ) {}

  ngOnInit() {
    if ( this.datos.user.id === 0 || this.datos.user.id === undefined ) {
      this.router.navigate(['/home']);
    }
    // console.log(this.tiempo);
    this.turnos = [ {codigo: 'N', descripcion: 'Noche'}, {codigo: 'D', descripcion: 'Dia'} ];
    this.cargaTML();
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  cargaTML() {
    if ( this.crear !== true ) {
      this.fecha       = this.tiempo.fecha;
      this.turno       = this.tiempo.turno;
      this.horaini     = this.tiempo.horadesde;
      this.horafin     = this.tiempo.horahasta;
      this.maquina     = this.tiempo.maquina;
      this.nombremaq   = this.tiempo.nombremaq;
      this.operador    = this.tiempo.operador;
      this.nombreoper  = this.tiempo.nombreoper;
      this.ayudante1   = this.tiempo.ayudante1;
      this.nombreayu1  = this.tiempo.nombreayu1;
      this.ayudante2   = this.tiempo.ayudante2;
      this.nombreayu2  = this.tiempo.nombreayu2;
      this.mecanico    = this.tiempo.mecanico;
      this.nombremec   = this.tiempo.nombremec;
      this.descripcion = this.tiempo.descripcion;
    }
    this.accion = ( this.crear === true ) ? 'crear' : 'actualizar' ;
  }

  async borrarTML() {
    const alert = await this.alertCtrl.create({
      subHeader: 'Este registro de TML será eliminado del sistema. Continúa?',
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
    if ( this.crear === true &&
         ( this.turno === '' ||
           this.horaini === '' ||
           this.horafin === '' ||
           this.maquina === '' ||
           this.operador === '' ||
           this.descripcion === '' ) ) {
      this.funciones.msgAlertErr( 'Debe completar todos los datos obligatorios.' );
    } else {
      //
      const data = {
        accion:      this.accion,
        id:          ( this.crear === true ) ? 0 : this.tiempo.id,
        facilitador: this.datos.user.id,
        fecha:       this.fecha,
        turno:       this.turno,
        horaini:     ( this.horaini.substring(11, 16) ),
        horafin:     ( this.horafin.substring(11, 16) ),
        maquina:     this.maquina,
        operador:    this.operador,
        ayudante1:   this.ayudante1,
        ayudante2:   this.ayudante2,
        mecanico:    this.mecanico,
        descripcion: this.descripcion,
      };
      //
      if ( data ) {
        switch (data.accion) {
          case 'actualizar':
            console.log( data, 'update' );
            this.efecto( data, 'update' );
            break;
          case 'crear':
            console.log( data, 'insert' );
            this.efecto( data, 'insert' );
            break;
          case 'borrar':
            console.log( data, 'delete' );
            this.efecto( data, 'delete' );
            break;
          default:
            break;
        }
      }
    }
  }

  efecto( data, movimiento ) {
    console.log('efecto', movimiento, data);
    this.buscando = true;
    this.netWork.comWithServer('tml',
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
