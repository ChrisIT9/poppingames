import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamingComponent } from './components/gaming/gaming.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameComponent } from './components/game/game.component';
import { DatePipe } from './pipes/date.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GamepageComponent } from './components/gamepage/gamepage.component';
import { FulldatePipe } from './pipes/fulldate.pipe';
import { IsodatePipe } from './pipes/isodate.pipe';
import { FatalerrorComponent } from './components/fatalerror/fatalerror.component';
import { ClipurlPipe } from './pipes/clipurl.pipe';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { RatingPipe } from './pipes/rating.pipe';



@NgModule({
    declarations: [
        AppComponent,
        GamingComponent,
        RegisterComponent,
        LoginComponent,
        GameComponent,
        DatePipe,
        NavbarComponent,
        GamepageComponent,
        FulldatePipe,
        IsodatePipe,
        FatalerrorComponent,
        ClipurlPipe,
        ScrollToTopComponent,
        RatingPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSliderModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
