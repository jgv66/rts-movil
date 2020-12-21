import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NetworkengineService } from '../../services/networkengine.service';
import { BaselocalService } from '../../services/baselocal.service';
import { FuncionesService } from '../../services/funciones.service';

@Component({
  selector: 'app-verdataof',
  templateUrl: './verdataof.page.html',
  styleUrls: ['./verdataof.page.scss'],
})
export class VerdataofPage implements OnInit {
  //
  @Input() orden: any;
  //
  buscando = false;
  titulo = '';
  registros = [];
  //
  codigo = '';
  descripcion = '';
  razonsocial = '';
  //
  constructor(private modalCtrl: ModalController,
              private netWork: NetworkengineService,
              public datos: BaselocalService,
              private funciones: FuncionesService ) {}

  ngOnInit() {
    console.log(this.orden);
    this.titulo = 'Registros de OF ' + this.orden.folio;
    this.cargaReport();
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  cargaReport() {
    this.buscando = true;
    this.netWork.comWithServer('ordenes', { accion: 'report',
                                            idusuario: this.datos.user.id,
                                            datos: JSON.stringify({ id: this.orden.id }) } )
      .subscribe( (data: any) => {
        //
        this.buscando = false;
        console.log(data);
        //
        try {
          if ( data.resultado !== 'ok' ) {
              this.funciones.msgAlertErr('No existen máquinas definidas.' );
          } else {
            //
            this.registros   = data.datos;
            this.codigo      = data.datos[0].codigo;
            this.descripcion = data.datos[0].descripcion;
            this.razonsocial = data.datos[0].razonsocial;
            //
          }
        } catch (err) {
          this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
        }
      },
      err  => {
        this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
      });
  }

  imprimir() {}

}
