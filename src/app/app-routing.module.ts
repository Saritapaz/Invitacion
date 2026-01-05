import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component'; // Ajusta la ruta a tu carpeta
import { LoginComponent } from './components/login/login.component';
import { GraciasComponent } from './components/gracias/gracias.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { consultaDatosComponent } from './components/consultaDatos/consultaDatos.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'confirmacion', component: ConfirmacionComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'formulario', component: FormularioComponent },
  { path: 'gracias', component: GraciasComponent },
  { path: 'consultaDatos', component: consultaDatosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
