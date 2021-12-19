import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamingComponent } from './components/gaming/gaming.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [{ path: "gaming", component: GamingComponent }, { path: "gaming/register", component: RegisterComponent }, { path: 'gaming/login', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
