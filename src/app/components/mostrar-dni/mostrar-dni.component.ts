import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DNI } from 'DNI';
import { IPCService } from 'src/app/services/ipc.service';

@Component({
  selector: 'app-mostrar-dni',
  templateUrl: './mostrar-dni.component.html',
  styleUrls: ['./mostrar-dni.component.css']
})
export class MostrarDNIComponent implements OnInit {
  DNI:DNI = {
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
  constructor(private IPCservice:IPCService, private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.IPCservice.DNI$.subscribe((DNI:DNI) =>{
      this.DNI = DNI;
      this.cdr.detectChanges();
      console.log(DNI.nombre);
    })
  }

}
