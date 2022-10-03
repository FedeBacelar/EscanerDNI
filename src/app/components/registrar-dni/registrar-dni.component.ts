import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DNI } from 'DNI';
import { IPCService } from 'src/app/services/ipc.service';
@Component({
  selector: 'app-registrar-dni',
  templateUrl: './registrar-dni.component.html',
  styleUrls: ['./registrar-dni.component.css']
})
export class RegistrarDNIComponent implements OnInit {
  arrayInputsValidos:boolean[] = [true,true,true,true,true,true,true];
  constructor(private ipcService:IPCService, private navegador:Router) { }

  ngOnInit(): void {
  }
  validarFecha(fechaHTML:HTMLInputElement, evento:KeyboardEvent){
    const LongitudFecha = fechaHTML.value.length
    if(LongitudFecha === 2 || LongitudFecha === 5){
      evento.key != "Backspace"? fechaHTML.value += '/' : fechaHTML.value = fechaHTML.value.substring(0, LongitudFecha-1);
    } else if(LongitudFecha > 10){
      fechaHTML.value = fechaHTML.value.substring(0, 10);
    }
  }
  validarDNI(dniHTML:HTMLInputElement, evento:KeyboardEvent){
    const LongitudDNI = dniHTML.value.length
    if(LongitudDNI === 2 || LongitudDNI === 6){
      evento.key != "Backspace"? dniHTML.value += '.' : dniHTML.value = dniHTML.value.substring(0, LongitudDNI-1);
    } else if(LongitudDNI > 10){
      dniHTML.value = dniHTML.value.substring(0, 10);
    }
  }
  enviarData(dni:string,nombre:string,apellido:string,genero:string,nacionalidad:string, fechaDeNacimiento:string, numeroDeTramite:string){
    if(this.validarAntesDeEnviar(dni, nombre, apellido, genero, nacionalidad, fechaDeNacimiento, numeroDeTramite)){
        const dataDNI:DNI = {
        dni: dni,
        nombre: nombre,
        apellido: apellido,
        genero: genero,
        nacionalidad: nacionalidad,
        fechaDeNacimiento:{
          dia: parseInt(fechaDeNacimiento.substring(0,2)),
          mes: parseInt(fechaDeNacimiento.substring(3,5)),
          anio: parseInt(fechaDeNacimiento.substring(6, 10))
        },
        numeroDeTramite: parseInt(numeroDeTramite)
      }
      //Si el DNI esta bien: enviar a electron para almacenar
      this.ipcService.registrarDNI(dataDNI)
      this.navegador.navigate([''])
      
      
    }
  }
  validarAntesDeEnviar(dni:string,nombre:string,apellido:string,genero:string,nacionalidad:string, fechaDeNacimiento:string, numeroDeTramite:string){
    this.arrayInputsValidos[0] = this.dniValido(dni)
    this.arrayInputsValidos[1] = this.stringValido(nombre)
    this.arrayInputsValidos[2] = this.stringValido(apellido)
    this.arrayInputsValidos[3] = this.stringValido(genero)
    this.arrayInputsValidos[4] = this.stringValido(nacionalidad)
    this.arrayInputsValidos[5] = this.fechaValida(fechaDeNacimiento)
    this.arrayInputsValidos[6] = this.nTramiteValido(numeroDeTramite)
    console.log(!(this.arrayInputsValidos.includes(false)))
    return !(this.arrayInputsValidos.includes(false))
  }
  dniValido(DNI:string){
    let DNIvalido = true;
    for(let index = 0;index < DNI.length;index++){
      if(index === 2 || index === 6){
        DNI[index] === '.'? undefined:DNIvalido = false;
      } else{
        '0123456789'.includes(DNI[index])? undefined:DNIvalido = false; 
      }
    }
    DNI.length === 10? undefined : DNIvalido = false;
    return DNIvalido;
  }
  stringValido(cadena:string){
    let cadenaValida = true;
    for(let letra of cadena){
      !('0123456789'.includes(letra))? undefined : cadenaValida = false;
    }
    return cadenaValida && cadena.length > 1
  }
  fechaValida(fecha:string){
    let fechaValida = true;
    for(let index = 0;index < fecha.length;index++){
      if(index === 2 || index === 5){
        fecha[index] === '/'? undefined:fechaValida = false;
      } else{
        '0123456789'.includes(fecha[index])? undefined:fechaValida = false; 
      }
    }
    return fechaValida && fecha.length === 10;
  }
  nTramiteValido(numeroDeTramite:string){
    let numeroDeTramiteValido = true;
    for(let num of numeroDeTramite){
      '0123456789'.includes(num)? undefined : numeroDeTramiteValido = false 
    }
    return numeroDeTramiteValido && numeroDeTramite.length === 12;
  }
}
