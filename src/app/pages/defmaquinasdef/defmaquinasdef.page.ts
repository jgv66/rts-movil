import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FuncionesService } from 'src/app/services/funciones.service';
import { BaselocalService } from '../../services/baselocal.service';

@Component({
  selector: 'app-defmaquinasdef',
  templateUrl: './defmaquinasdef.page.html',
  styleUrls: ['./defmaquinasdef.page.scss'],
})
export class DefmaquinasdefPage implements OnInit {

  @Input() maquina: any;
  @Input() crear: boolean;
  //
  buscando      = false;
  codmaquina    = '';
  descripcion   = '';
  activa        = true;
  ultimamant    = new Date();
  diasentremant = 0;
  //
  accion = '';
  //
  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              public baseLocal: BaselocalService,
              private funciones: FuncionesService ) {}

  ngOnInit() {
    if ( this.crear === false ) {
      this.descripcion   = this.maquina.descripcion;
      this.activa        = this.maquina.activa;
      this.ultimamant    = this.maquina.ultimamant;
      this.diasentremant = this.maquina.diasentremant;
    }
    this.accion = ( this.crear === true ) ? 'crear' : 'actualizar' ;
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  async borrarMaquina() {
    const alert = await this.alertCtrl.create({
      subHeader: 'Esta máquina será eliminada del sistema. Continúa?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
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
    if ( this.crear === true && ( this.codmaquina === '' || this.descripcion === '' ) ) {
      this.funciones.msgAlertErr( 'Debe completar datos obligatorios de Código de Máquina y su Descripción.' );
      return;
    }
    //
    this.modalCtrl.dismiss({
      accion:        this.accion,
      codmaquina:    ( this.crear === true) ? this.codmaquina : this.maquina.maquina,
      descripcion:   this.descripcion,
      activa:        this.activa,
      ultimamant:    this.ultimamant,
      diasentremant: this.diasentremant,
    });
  }

}
