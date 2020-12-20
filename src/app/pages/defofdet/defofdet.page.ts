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
  @Input() orden: any;
  //
  buscando = false;
  maquina = ''; nombremaq = '';
  maestro = ''; nombremae = '';
  ayudante1 = ''; nombreayu1 = '';
  ayudante2 = ''; nombreayu2 = '';
  mecanico = ''; nombremec = '';
  proceso = ''; nombrepro = '';
  //
  accion = '';
  titulo = '';
  //
  constructor(private modalCtrl: ModalController,
              private netWork: NetworkengineService,
              public datos: BaselocalService,
              private funciones: FuncionesService ) {}

  ngOnInit() {
    //
    this.datos.getMaquinas();
    this.datos.getOperarios();
    this.datos.getProcesos();
    //
    console.log(this.orden);
    this.titulo = 'Definir OF: ' + this.orden.folio;
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  actualizar() {
    //
    if ( this.maquina === '' || this.maestro === ''  ) {
      this.funciones.msgAlertErr( 'Debe completar datos obligatorios de Máquina y Maestro.' );
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
      proceso:   this.proceso
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
