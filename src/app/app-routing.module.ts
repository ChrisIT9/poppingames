import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamepageComponent } from './components/gamepage/gamepage.component';
import { GamingComponent } from './components/gaming/gaming.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
    { path: "gaming", component: GamingComponent }, 
    { path: "gaming/register", component: RegisterComponent }, 
    { path: 'gaming/login', component: LoginComponent },
    { path: 'gaming/games/:id', component: GamepageComponent },
    { path: 'gaming/games', component: GamingComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
