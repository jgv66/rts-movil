import { Component, OnInit, Input } from '@angular/core';
import { FuncionesService } from '../../services/funciones.service';
import { BaselocalService } from '../../services/baselocal.service';
import { ModalController } from '@ionic/angular';
import { NetworkengineService } from '../../services/networkengine.service';

@Component({
  selector: 'app-defofdet',
  templateUrl: './defofdet.page.html',
  styleUrls: ['./defofdet.page.scss'],
})
export class DefofdetPage implements OnInit {
  //
  @Input() facilitador;
  @Input() orden: any;
  @Input() opcion;
  //
  buscando = false;
  maquina = ''; nombremaq = '';
  maestro = ''; nombremae = '';
  ayudante1 = ''; nombreayu1 = '';
  ayudante2 = ''; nombreayu2 = '';
  mecanico = ''; nombremec = '';
  proceso = ''; nombrepro = '';
  cantidad = 0;
  turno = ''; nombretur = '';
  impresion = '';
  turnos = [{turno: 'D', descripcion: 'Día'},
            {turno: 'N', descripcion: 'Noche'}];
  //
  accion = '';
  titulo = '';
  //
  constructor(private modalCtrl: ModalController,
              private netWork: NetworkengineService,
              public datos: BaselocalService,
              private funciones: FuncionesService ) {}

  ngOnInit() {
    console.log(this.orden, this.opcion);
    //
    if ( this.opcion === 'A' ) {
      this.titulo = 'Definir OF: ' + this.orden.folio;
    } else if ( this.opcion === 'P' ) {
      this.titulo = 'Actualizar OF: ' + this.orden.folio;
      //
      this.maquina   =  this.orden.maquina;
      this.maestro   = this.orden.maestro;
      this.ayudante1 = this.orden.ayudante1;
      this.ayudante2 = this.orden.ayudante2;
      this.mecanico  = this.orden.mecanico;
      this.proceso   = this.orden.proceso;
      //
    }
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  actualizar() {
    //
    if ( this.maquina === '' || this.maestro === '' ) {
      this.funciones.msgAlertErr( 'Debe completar datos obligatorios mínimos.' );
      return;
    }
    if ( ( this.cantidad <= 0 || this.turno === '' ) && this.opcion === 'P'  ) {
      this.funciones.msgAlertErr( 'Debe completar datos obligatorios mínimos. Cantidad, turno' );
      return;
    }
    //
    const data = {
      accion:    'update',
      id:        this.orden.id,
      user:      this.datos.user.id,
      maestro:   this.maestro,
      maquina:   this.maquina,
      ayudante1: this.ayudante1,
      ayudante2: this.ayudante2,
      mecanico:  this.mecanico,
      proceso:   this.proceso,
      cantidad:  this.cantidad,
      turno:     this.turno,
      impresion: this.impresion
    };
    //
    if ( data ) {
      this.efecto( data, 'update' );
    }
  }

  efecto( data, movimiento ) {
    // console.log('efecto', movimiento, data);
    this.buscando = true;
    this.netWork.comWithServer('ordenes',
                               { accion: movimiento,
                                 idusuario: this.datos.user.id,
                                 datos: JSON.stringify(data) } )
      .subscribe( (resp: any) => {
        //
        this.buscando = false;
        // console.log(resp);
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
