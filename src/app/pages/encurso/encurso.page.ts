/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, Input, OnInit, ViewChild, AfterViewInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, IonInput, AlertController, MenuController } from '@ionic/angular';

import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

import { BaselocalService } from '../../services/baselocal.service';
import { FuncionesService } from '../../services/funciones.service';
import { NetworkengineService } from '../../services/networkengine.service';

@Component({
  selector: 'app-encurso',
  templateUrl: './encurso.page.html',
  styleUrls: ['./encurso.page.scss'],
})
export class EncursoPage implements OnInit, AfterViewInit, OnDestroy {

  @Input() numero;
  @Input() totalACapturar;

  @ViewChild('inputCodigo', {static: false}) inputCodigo: IonInput;
  @ViewChild('inputCantid', {static: false}) inputCantid: IonInput;

  @ViewChild(BarcodeScannerLivestreamComponent) barcodeScanner: BarcodeScannerLivestreamComponent;
  
  scanActive = false;
  result = null;

  cargando = false;
  textoBuscar = '';
  detalle: any[] = [];
  modoManual = true;
  contados = 0;
  itemes = 0;
  //
  codigo = '';
  descripcion = '';
  rtu = 1;
  cantidad: number;
  nrolote = '';
  unidad = '';
  unidadIgual = false;
  unidades = [];

  buscando = false;

  constructor(public datos: BaselocalService,
              private funciones: FuncionesService,
              private router: Router,
              private netWork: NetworkengineService,
              private modalCtrl: ModalController ) {}

  ngOnInit() {
    //
    if ( !this.datos.logeado ) {
      this.router.navigate(['login']);
    }
    this.limpiar();
    this.cuantosLeidos();
    //
  }

  async contarItemesDetalleOC( numero ) {
    this.buscando = true;
    this.itemes = 0;
    this.netWork.comWithServer('ordenesdecompra', { accion: 'contardetalleoc', numero: this.numero, idusuario: this.datos.user.id } )
      .subscribe( (data: any) => {
        //
        this.buscando = false;
        console.log(data);
        //
        try {
          if ( data.resultado !== 'ok' || data.datos.length === 0 ) {
              this.funciones.msgAlertErr('No existen OC pendientes de recibir.' );
          } else {
            this.itemes =  data.datos[0].itemes;
          }
        } catch (err) {
          this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
          return 0;
        }
      },
      err => {
        this.funciones.msgAlertErr( 'Ocurrió un error -> ' + err );
        return 0;
      });
  }

  ngAfterViewInit() {
    this.barcodeScanner.start();
  }
  ngOnDestroy() {
    this.barcodeScanner.stop();
  }
  stopScanner() {
    this.barcodeScanner.stop();
    this.scanActive = false;
  } 

  async checkPermission() {
    return true;
    // return new Promise(async (resolve, reject) => {
    //   const status = await this.barcodeScanner.checkPermission({ force: true });
      
    //   if (status.granted) {
    //     // We are fine
    //     resolve(true);
    //   } else if (status.denied) {
    //     // Denied before
    //     const alert = await this.alertCtrl.create({
    //       header: 'Sin permiso',
    //       message: 'Permita que la cámara sea usada.',
    //       buttons: [{
    //         text: 'No',
    //         role: 'cancel'
    //       },
    //       {
    //         text: 'Open Settings',
    //         handler: () => {
    //           resolve(false);
    //           BarcodeScanner.openAppSettings();
    //         }
    //       }]
    //     });
    //     await alert.present();
    //   } else {
    //     resolve(false);
    //   } 
    // });   
  };

  onValueChanges(result) {
    if ( this. scanActive ) {
      this.codigo = result.codeResult.code;
      this.scanActive = false;
    }
  }
  onStarted(started) {
    console.log(started);
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  async startScanner() {
    const allowed = await this.checkPermission();
    
    if (allowed) {
      this.scanActive = true;
      const result:any = await this.barcodeScanner.start()
  
      if (result) {
        this.result = result.codeResult.code;
        this.scanActive = false;
      }
    }
  }

  async cuantosLeidos() {
    // this.cargando = true;
    // //
    // this.datos.servicioWEB( '/cuentaCodigos', { id: this.id, usuario: this.datos.user.usuario } )
    //   .subscribe( (dev: any) => {
    //     this.cargando = false;
    //     this.contados = dev.datos[0].miconteo;
    //     this.totalACapturar = dev.datos[0].total;
    //   });
  }

  async yaConDato() {
    // if ( this.codigo ) {
    //   this.cargando = true;
    //   //
    //   this.datos.servicioWEB( '/buscarCodigo', { id: this.id, codigo: this.codigo } )
    //     .subscribe( (dev: any) => {
    //       this.cargando = false;
    //       //
    //       console.log(dev);

    //       if ( dev.datos.length > 0 ) {
    //         //
    //         this.codigo      = dev.datos[0].codigo;
    //         this.descripcion = dev.datos[0].descripcion;
    //         this.rtu         = dev.datos[0].rtu;
    //         this.unidad      = dev.datos[0].unidad1;
    //         this.unidadIgual = ( dev.datos[0].unidad1 === dev.datos[0].unidad2 );
    //         this.unidades    = [ {unidad: dev.datos[0].unidad1}, {unidad: dev.datos[0].unidad2} ];
    //         this.nrolote   = '';
    //         //
    //         this.inputCantid.setFocus();
    //         //
    //       } else {
    //         //
    //         this.funciones.muestraySale( 'Código ('+this.codigo+') no existe en conteo.', 1.5, 'middle' );
    //         this.codigo = '';
    //       }
    //       //
    //     },
    //     (error) => {
    //       this.cargando = false;
    //       this.funciones.msgAlert( '', error );
    //     });
    //     //
    // }
  }

  async buscarCodigo() {
    // //
    // const titulo = 'Digite el código...';
    // //
    // const codigo = '';
    // const prompt = await this.alertCtrl.create({
    //   header:  titulo,
    //   inputs:  [ { name: 'codigo', placeholder: codigo } ],
    //   mode:    'ios',
    //   buttons:
    //   [
    //     { text: 'Salir',
    //       handler: () => {}
    //     },
    //     { text: 'Aceptar',
    //       handler: data => {
    //           this.codigo = data.codigo || '' ;
    //       }
    //     }
    //   ]
    // });
    // await prompt.present();
    // //
  }

  async add2Lista() {
    // //
    // if ( this.codigo !== '' && this.cantidad > 0 ) {
    //   //
    //   this.cargando = true;
    //   const carga = {
    //     id: this.id,
    //     usuario: this.datos.user.usuario,
    //     codigo: this.codigo,
    //     conteo1: ( this.unidad === this.unidades[0].unidad ) ? this.cantidad : this.cantidad * this.rtu,
    //     conteo2: ( this.unidad === this.unidades[1].unidad ) ? this.cantidad : this.cantidad / this.rtu,
    //   };
    //   this.datos.servicioWEB( '/grabaMiLectura', carga )
    //       .subscribe( (dev: any) => {
    //           this.cargando = false;
    //           this.cuantosLeidos();
    //       },
    //       (error) => {
    //         this.cargando = false;
    //         this.funciones.msgAlert( '', error );
    //       });
    //   //
    //   this.limpiar();
    //   this.inputCodigo.setFocus();
    //   //
    // }
  }

  limpiar() {
    this.codigo      = '';
    this.descripcion = '';
    this.cantidad    = undefined;
    this.nrolote   = '';
    this.unidad      = '';
    this.unidades    = [];
    this.unidadIgual = false;
    this.rtu         = 1;
  }

  async verMisCapturados() {
    // //
    // const modal = await this.modalCtrl.create({
    //   component: MiconteoPage,
    //   cssClass: 'my-custom-class',
    //   componentProps: { id: this.id }
    // });
    // return await modal.present();
  }

}

