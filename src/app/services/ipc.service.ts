import { Injectable } from '@angular/core';
import { DNI } from 'DNI';

import { BehaviorSubject } from 'rxjs';
const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class IPCService {

  DNI$ = new BehaviorSubject<DNI>({
    dni: "",
    nombre: '',
    apellido:'',
    genero:'',
    nacionalidad:'',
    fechaDeNacimiento:{
      dia: 0,
      mes: 0,
      anio: 0
    },
    numeroDeTramite: 0
});

  constructor() {//Creamos la comunicacion en el constructor (para canales main-to-renderer)
    electron.ipcRenderer.on('getDNI', (event:Event, DNI:DNI) =>{
      this.DNI$.next(DNI);
    })
  }
  enviarDNI(data:string){//Enviamos datos (renderer-to-main)
    electron.ipcRenderer.send('sendDNI',data)
  }
  registrarDNI(data:DNI){
    electron.ipcRenderer.send('registrarDNI', data);
  }
}
