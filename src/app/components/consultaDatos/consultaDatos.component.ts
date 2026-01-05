import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModificardatosService } from 'src/app/services/modificarDatos.service';
@Component({
  selector: 'app-consultaDatos',
  templateUrl: './consultaDatos.component.html',
  styleUrls: ['./consultaDatos.component.scss']
})
export class consultaDatosComponent implements OnInit {
  asistentes: any[] = [];
  telefono: string | null = '';
  loading: boolean = true;

  constructor(private modificarDatosService: ModificardatosService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.telefono = localStorage.getItem('telefono');
    
    if (!this.telefono) {
      this.router.navigate(['/login']);
      return;
    }

    this.cargarDatos();
  }

  cargarDatos() {
    this.http.get<any>(`http://localhost:8080/api/asistencia/datos/${this.telefono}`).subscribe({
      next: (data) => {
        // Asignamos la lista de asistentes que viene del Backend
        this.asistentes = data.asistentes; 
        this.loading = false;
      },
      error: (err) => {
        console.error("Error al recuperar datos", err);
        this.loading = false;
      }
    });
  }

  cancelarAsistencia() {
    if (confirm('¿Estás seguro de que deseas cancelar tu asistencia? Se borrarán todos los datos registrados.')) {
      this.http.delete(`http://localhost:8080/api/asistencia/cancelar/${this.telefono}`).subscribe({
        next: () => {
          // Al cancelar, limpiamos el rol y volvemos al inicio
          alert('Asistencia cancelada correctamente.');
          this.router.navigate(['/confirmacion']);
        },
        error: (err) => console.error("Error al cancelar", err)
      });
    }
  }

  editarAsistencia() {
  // Guardamos los asistentes actuales en el servicio puente
  this.modificarDatosService.setDatos(this.asistentes); 
  // Navegamos al formulario que ya conocemos
  this.router.navigate(['/formulario']); 
}
}