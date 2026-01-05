import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModificardatosService {
  private datosAsistentes: any = null;

  setDatos(datos: any) {
    this.datosAsistentes = datos;
  }

  getDatos() {
    const temp = this.datosAsistentes;
    this.datosAsistentes = null; // Limpiamos tras leer para evitar precargas accidentales
    return temp;
  }
}