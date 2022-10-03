interface fecha{
    dia:number,
    mes:number,
    anio:number
}

export interface DNI{
    dni:string,
    nombre:string,
    apellido:string,
    genero:string,
    nacionalidad:string,
    fechaDeNacimiento:fecha,
    numeroDeTramite:number
}