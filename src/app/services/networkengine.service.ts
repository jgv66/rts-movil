import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkengineService {

  url = environment.URL;

  constructor( private http: HttpClient ) {
    // console.log('<<< NetworkengineProvider >>> ', this.url );
  }

  comWithServer( cSP: string, parametros?: any ) {
    const accion = '/' + cSP;
    const url    = this.url + accion;
    const body   = parametros;
    return this.http.post( url, body );
  }

}
