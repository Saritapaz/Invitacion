import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitacionComponent } from './components/invitacion/invitacion.component';
import { LoginComponent } from './components/login/login.component';
import { WeddingComponent } from './components/wedding/wedding.component';

const routes: Routes = [
  { path: '', component: InvitacionComponent, data: { animation: 'HomePage' } },
  { path: 'wedding', component: WeddingComponent, data: { animation: 'WeddingPage' } },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
