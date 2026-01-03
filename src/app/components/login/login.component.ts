import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { LoginResponse } from './login-response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  telefono = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}
  respuestaLogin?: LoginResponse;
  onLogin() {
    this.errorMessage = '';
    this.respuestaLogin = undefined; // O null, dependiendo de cómo lo definieras
    const credentials = { telefono: this.telefono, password: this.password };
    
    this.authService.login(credentials).subscribe({
      next: (data) => {
       this.respuestaLogin = data; // Guardamos la respuesta (id, token, rol)
      console.log('Usuario autenticado con rol:', data.rol);
      },
      error: (err) => {
        this.respuestaLogin = undefined;
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
