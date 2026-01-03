import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component'; // Ajusta la ruta a tu carpeta
import { LoginComponent } from './components/login/login.component';
import { GraciasComponent } from './components/gracias/gracias.component';
import { FormularioComponent } from './components/formulario/formulario.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'confirmacion', component: ConfirmacionComponent }, // <--- Esta línea es la clave
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'formulario', component: FormularioComponent },
  { path: 'gracias', component: GraciasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
