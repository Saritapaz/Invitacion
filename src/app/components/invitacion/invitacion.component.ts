import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invitacion',
  templateUrl: './invitacion.component.html',
  styleUrls: ['./invitacion.component.scss']
})
export class InvitacionComponent {
  showModal = false;

  constructor(private router: Router) {}
  sobreAbierto = false;

  abrirSobre() {
  this.sobreAbierto = true;

  setTimeout(() => {
    this.router.navigate(['/wedding']);
  }, 600); // tiempo de animación
}
}