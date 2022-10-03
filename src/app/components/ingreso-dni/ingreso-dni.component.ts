import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IPCService } from 'src/app/services/ipc.service';
import { Router } from '@angular/router';
import { DNI } from 'DNI';
@Component({
  selector: 'app-ingreso-dni',
  templateUrl: './ingreso-dni.component.html',
  styleUrls: ['./ingreso-dni.component.css']
})
export class IngresoDNIComponent implements OnInit {
  dataDNI:DNI = {
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
  }
  ingresoValido:boolean = true;
  constructor(private IPCservice:IPCService, private cdr:ChangeDetectorRef, private navegador:Router) { }

  ngOnInit(): void {
    this.IPCservice.DNI$.subscribe((data:DNI)=>{
      this.dataDNI = data;
      this.cdr.detectChanges();
      console.log(data);
    })
  }
  enviarData(DNIhtml:HTMLInputElement){
    const DNI = DNIhtml.value;
    DNIhtml.value = ''
    this.ingresoValido = this.validarAntesDeEnviar(DNI)
    if(this.ingresoValido){
      this.IPCservice.enviarDNI(DNI)
      this.navegador.navigate(['DNI'])
    }
  }
  validarDato(HTMLinput:HTMLInputElement, evento:KeyboardEvent){
    const LongitudDNI = HTMLinput.value.length
    if(LongitudDNI === 2 || LongitudDNI === 6){
      evento.key != "Backspace"? HTMLinput.value += '.' : HTMLinput.value = HTMLinput.value.substring(0, LongitudDNI-1);
    } else if(LongitudDNI > 10){
      HTMLinput.value = HTMLinput.value.substring(0, 10)
    }
  }
  validarAntesDeEnviar(DNI:string){
    let DNIvalido = true;
    for(let index = 0;index < DNI.length;index++){
      if(index === 2 || index === 6){
        DNI[index] === '.'? undefined:DNIvalido = false;
      } else{
        '0123456789'.includes(DNI[index])? undefined:DNIvalido = false; 
      }
    }
    return DNIvalido;
  }
}
