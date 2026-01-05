import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormularioAsistente } from './formulario-response.model';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { ModificardatosService } from 'src/app/services/modificarDatos.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit{
  // Datos del invitado (vienen del login)
  nombre: string = localStorage.getItem('nombre') || '';
  apellido: string = localStorage.getItem('apellido') || '';
  // Lista dinámica de asistentes
  asistentes: any[] = [];
  // Lista de alergias que traeremos del Back
  listaAlergias: any[] = [];
  listaAutobuses: any[] = [];
  // Datos que el usuario rellenará
  datos: FormularioAsistente = {
    invitadoId: Number(localStorage.getItem('userId')),
    sexo: '',
    tallaPie: '',
    comida: '',
    alergiasIds: [] as number[],
    autobusesIds: [] as number[],
    cancion: ''
  };

  constructor(private modificarDatosService: ModificardatosService, private http: HttpClient, private router: Router) {}

ngOnInit() {
  // 1. Cargar datos maestros (Alergias/Buses) siempre primero
  this.cargarDatosMaestros();

  // 2. Intentar obtener datos para modificar
  const datosPrecargados = this.modificarDatosService.getDatos();

  if (datosPrecargados && datosPrecargados.length > 0) {
    // CASO MODIFICAR: Reemplazamos toda la lista con los datos que vienen del servicio
    this.asistentes = datosPrecargados.map((a: any) => ({
      ...a, // Esto ya incluye nombre, apellido, comida, sexo, etc.
      alergiasIds: a.alergiasIds || [],
      autobusesIds: a.autobusesIds || []
    }));
    console.log('Formulario precargado para modificación:', this.asistentes);
  } else {
    // CASO NUEVO: Inicializamos solo si no estamos modificando
    const nombreLocal = localStorage.getItem('nombre') || '';
    const apellidoLocal = localStorage.getItem('apellido') || '';
    
    this.asistentes = [
      this.crearNuevoAsistente(nombreLocal, apellidoLocal)
    ];
    console.log('Formulario inicializado para nuevo registro');
  }
}

  crearNuevoAsistente(nombre = '', apellido = '') {
    return {
      nombre: nombre,
      apellido: apellido,
      sexo: '',
      tallaPie: '',
      comida: '',
      cancion: '',
      alergiasIds: [],
      autobusesIds: []
    };
  }
  agregarAcompanante() {
    if (this.asistentes.length < 3) { // Máximo 1 invitado + 2 acompañantes
      this.asistentes.push(this.crearNuevoAsistente());
    }
  }

  quitarAcompanante(index: number) {
    this.asistentes.splice(index, 1);
  }
  enviarTodo() {
    // 1. Recuperamos el teléfono que guardamos al iniciar sesión
    const telefonoSesion = localStorage.getItem('telefono'); 

    if (!telefonoSesion) {
      console.error("No se encontró el teléfono en la sesión");
      return;
    }
    // 2. Construimos el objeto final con el nombre de campo que espera Java
    const payload = {
      telefonoComun: telefonoSesion, // Aquí estaba el fallo, llegaba null
      asistentes: this.asistentes
    };

    this.http.post('http://localhost:8080/api/asistencia/registrar', payload).subscribe({
      next: () => this.router.navigate(['/gracias']),
      error: (err) => console.error(err)
    });
  }

  cargarDatosMaestros(){
     // Asegúrate de que la URL coincide con el @RequestMapping del Controller
    this.http.get<any[]>('http://localhost:8080/api/asistencia/alergias').subscribe({
      next: (res) => {
        this.listaAlergias = res;
      },
      error: (err) => {
        console.error('Error al cargar alergias. Verifica el Controller.', err);
      }
    });

     // Asegúrate de que la URL coincide con el @RequestMapping del Controller
    this.http.get<any[]>('http://localhost:8080/api/asistencia/autobuses').subscribe({
      next: (res) => {
        this.listaAutobuses = res;
      },
      error: (err) => {
        console.error('Error al cargar los autobuses. Verifica el Controller.', err);
      }
    });
  }
  toggleAlergia(persona: any, id: number) {
  // Buscamos el ID dentro del array de alergias de esa persona específica
  const index = persona.alergiasIds.indexOf(id);
  
  if (index > -1) {
    persona.alergiasIds.splice(index, 1); // Si ya estaba, lo quitamos
  } else {
    persona.alergiasIds.push(id); // Si no estaba, lo añadimos
  }
}

toggleAutobus(persona: any, id: number) {
  // Buscamos el ID dentro del array de autobuses de esa persona específica
  const index = persona.autobusesIds.indexOf(id);
  
  if (index > -1) {
    persona.autobusesIds.splice(index, 1); // Si ya estaba, lo quitamos
  } else {
    persona.autobusesIds.push(id); // Si no estaba, lo añadimos
  }
}
   
}
