import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { LoginResponse } from './login-response.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  telefono = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  respuestaLogin?: LoginResponse;

  onLogin() {
    this.errorMessage = '';
    this.respuestaLogin = undefined; // O null, dependiendo de cómo lo definieras
    const credentials = { telefono: this.telefono, password: this.password};
    
    this.authService.login(credentials).subscribe({
      next: (data) => {
        const rolRecibido = data.rol?.trim(); // Quitamos espacios accidentales
        // Guardamos el ID que viene del backend
        console.log('Datos recibidos del servidor:', data); // <-- AÑADE ESTO PARA DEBUREAR
        localStorage.setItem('telefono', this.telefono);
        localStorage.setItem('userId', data.id.toString());
        localStorage.setItem('nombre', data.nombre); // Asegúrate de que se llame 'nombre'
        localStorage.setItem('apellido', data.apellido);
        console.log('Este es el rol recibido: ', rolRecibido);
        if (!rolRecibido || rolRecibido === '' || rolRecibido === 'I') {
          console.log('Navegando a confirmación...');
          this.router.navigate(['/confirmacion']);
        } else if (rolRecibido === 'A') {
          console.log('Navegando a consultaDatos...');
          this.router.navigate(['/consultaDatos']);
        } else {
          console.warn('Rol no reconocido:', rolRecibido);
        }
      },
      error: (err) => {
        this.respuestaLogin = undefined;
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
