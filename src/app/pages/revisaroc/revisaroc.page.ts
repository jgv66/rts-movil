import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { BaselocalService } from '../../services/baselocal.service';
import { NetworkengineService } from '../../services/networkengine.service';
import { FuncionesService } from '../../services/funciones.service';

@Component({
  selector: 'app-revisaroc',
  templateUrl: './revisaroc.page.html',
  styleUrls: ['./revisaroc.page.scss'],
})
export class RevisarocPage implements OnInit {
  
  @Input() orden;
   
  crear = false;
  detalle = [];
  numero = '';
  titulo = 'Revisar OC #';
  buscando = false;

  constructor( private router: Router,
               private modalCtrl: ModalController,
               public datos: BaselocalService,
               private netWork: NetworkengineService,
               private funciones: FuncionesService ) {}
              
  ngOnInit() {
    if ( this.datos.user.id === 0 || this.datos.user.id === undefined ) {
      this.router.navigate(['/home']);
    }
    this.numero = this.orden.numero.toString();
    this.cargaOC();
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  cargaOC() {
    
    this.netWork.comWithServer('ordenesdecompra', { accion: 'verdetalleoc',
                                                    numero: this.numero,
                                                    idusuario: this.datos.user.id } )
      .subscribe( (data: any) => {
        //
        this.buscando = false;
        console.log(data);
        //
        try {
          if ( data.resultado !== 'ok' || data.datos.length === 0 ) {
              this.funciones.msgAlertErr('No existen OC pendientes de recibir.' );
          } else {
            this.detalle = data.datos;
          }
        } catch (err) {
          this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
        }
      },
      err => {
        this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
      });    
  }

}
