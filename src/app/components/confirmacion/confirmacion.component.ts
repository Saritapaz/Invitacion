import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Para la petición PUT
import { Router } from '@angular/router'; // Para navegar

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // IMPORTANTE incluir HttpClientModule aquí
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})

export class ConfirmacionComponent {
  // Estados posibles: 'pendiente', 'si', 'no'
  estado: string = 'pendiente';
  userId: string | null = localStorage.getItem('userId');

  constructor(private http: HttpClient, private router: Router) {}

  confirmar(decision: string) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
    alert("Sesión expirada, por favor vuelve a loguearte");
    this.router.navigate(['/login']);
    return;
    }

    const payload = { 
        id: userId,      
        decision: decision 
    };

    this.http.put('http://localhost:8080/api/confirmar', payload).subscribe({
            next: (res) => {
            if (decision === 'S') {
                localStorage.setItem('rol', 'ASISTENTE');
                this.router.navigate(['/formulario']);
            } else {
                localStorage.setItem('rol', 'INVITADO');
                this.estado = 'no';
            }
        },
        error: (err) => {
        console.error('Error detallado:', err); // Mira esto en la consola F12
        alert('Error al procesar tu respuesta');
        }
    });
}

  volverAlLogin() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}