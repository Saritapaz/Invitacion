import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gracias',
  standalone: true,
  templateUrl: './gracias.component.html',
  styleUrls: ['./gracias.component.scss']
})
export class GraciasComponent {
  constructor(private router: Router) {}

  irAlInicio() {
    // Limpiamos el localStorage para que al volver a entrar 
    // se valide el nuevo rol 'ASISTENTE'
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  consultarDatos() {
    this.router.navigate(['/consultaDatos']);
  }
}