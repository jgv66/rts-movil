import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaselocalService } from '../../services/baselocal.service';
import { NetworkengineService } from '../../services/networkengine.service';
import { FuncionesService } from '../../services/funciones.service';
import { ModalController } from '@ionic/angular';
import { DefmaquinasdefPage } from '../defmaquinasdef/defmaquinasdef.page';

@Component({
  selector: 'app-defmaquinas',
  templateUrl: './defmaquinas.page.html',
  styleUrls: ['./defmaquinas.page.scss'],
})
export class DefmaquinasPage implements OnInit {

  buscando = false;
  maquinas = [];

  constructor( private router: Router,
               private datos: BaselocalService,
               private netWork: NetworkengineService,
               private funciones: FuncionesService,
               private modalCtrl: ModalController ) { }

  ngOnInit() {
    if ( this.datos.user.id === 0 || this.datos.user.id === undefined ) {
      this.router.navigate(['/home']);
    }
    this.cargaMaquinas();
  }

  salir() {
    this.router.navigate(['/inicio']);
  }

  doRefresh( event ) {
    this.cargaMaquinas( event );
  }

  cargaMaquinas( event? ) {
    let i = 0;
    let j ;
    this.buscando = true;
    this.netWork.comWithServer('maquinas', { accion: 'select', idusuario: this.datos.user.id } )
      .subscribe( (data: any) => {
        //
        this.buscando = false;
        // console.log(data);
        //
        try {
          if ( data.resultado !== 'ok' ) {
              this.funciones.msgAlertErr('No existen máquinas definidas.' );
          } else {
            //
            for ( i = 0; i < data.datos.length; ++i ) {
              j = Math.floor((Math.random() * 7) + 1);
              data.datos[i].picture = 'assets/imgs/maquina0' + j.toString() + '.png';
            }
            this.maquinas = data.datos;
            //
            if ( event !== undefined ) {
              event.target.complete();
            }
          }
        } catch (err) {
          this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
        }
      },
      err  => {
        this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
      });
  }

  async tratMaquina( crear: boolean, maquina? ) {
    const modal = await this.modalCtrl.create({
      component: DefmaquinasdefPage,
      componentProps: { crear, maquina }
    });
    await modal.present();
    // el retorno
    const { data } = await modal.onWillDismiss();
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
    this.netWork.comWithServer('maquinas',
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
            this.cargaMaquinas();
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
