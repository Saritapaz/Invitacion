import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormularioAsistente } from './formulario-response.model';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

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
  // Lista de alergias que traeremos del Back
  listaAlergias: any[] = [];
  // Datos que el usuario rellenará
  datos: FormularioAsistente = {
    invitadoId: Number(localStorage.getItem('userId')),
    sexo: '',
    tallaPie: '',
    comida: '',
    alergiasIds: [] as number[],
    cancion: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

ngOnInit() {
    // Asegúrate de que la URL coincide con el @RequestMapping del Controller
    this.http.get<any[]>('http://localhost:8080/api/asistencia/alergias').subscribe({
      next: (res) => {
        this.listaAlergias = res;
      },
      error: (err) => {
        console.error('Error al cargar alergias. Verifica el Controller.', err);
      }
    });
  }

  toggleAlergia(id: number) {
    const index = this.datos.alergiasIds.indexOf(id);
    if (index > -1) {
      this.datos.alergiasIds.splice(index, 1);
    } else {
      this.datos.alergiasIds.push(id);
    }
  }

  enviarFormulario() {
    this.http.post('http://localhost:8080/api/asistencia/registrar', this.datos).subscribe({
      next: () => {
        localStorage.setItem('rol', 'ASISTENTE'); // Actualizamos el rol tras el éxito
        alert('¡Gracias! Tu asistencia ha sido registrada.');
        this.router.navigate(['/gracias']); // Pantalla final
      },
      error: () => alert('Error al enviar el formulario')
    });
  }

}
