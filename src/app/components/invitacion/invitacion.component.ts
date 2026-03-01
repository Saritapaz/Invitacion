import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invitacion',
  templateUrl: './invitacion.component.html',
  styleUrls: ['./invitacion.component.scss']
})
export class InvitacionComponent implements OnInit {
  showModal = false;

  constructor(private router: Router) { }
  sobreAbierto = false;

  animando = false;

  abrirSobre() {

    if (this.animando) return;

    this.animando = true;

    this.audio.currentTime = 0;
    this.audio.volume = 0.4;
    this.audio.play();

    // Romper lacre a los 200ms
    setTimeout(() => {
      this.sobreAbierto = true;
    }, 200);

    // Navegar después de la animación
    setTimeout(() => {
      this.router.navigate(['/wedding']);
    }, 900);
  }
  audio = new Audio();

  ngOnInit() {
    this.audio.src = 'assets/audio/sobre.mp3';
    this.audio.load();
  }
}