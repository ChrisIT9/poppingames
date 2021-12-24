import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamepageComponent } from './components/gamepage/gamepage.component';
import { GamingComponent } from './components/gaming/gaming.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
    { path: "poppingames", component: GamingComponent }, 
    { path: "poppingames/register", component: RegisterComponent }, 
    { path: 'poppingames/login', component: LoginComponent },
    { path: 'poppingames/games/:id', component: GamepageComponent },
    { path: 'poppingames/games', component: GamingComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
