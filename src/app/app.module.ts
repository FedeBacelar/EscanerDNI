import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Route, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngresoDNIComponent } from './components/ingreso-dni/ingreso-dni.component';
import { IPCService } from './services/ipc.service';
import { MostrarDNIComponent } from './components/mostrar-dni/mostrar-dni.component';
import { RegistrarDNIComponent } from './components/registrar-dni/registrar-dni.component';

const routes:Route[] = [
  {path: '', component: IngresoDNIComponent},
  {path: 'DNI', component: MostrarDNIComponent},
  {path: 'registro', component: RegistrarDNIComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    IngresoDNIComponent,
    MostrarDNIComponent,
    RegistrarDNIComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [IPCService],
  bootstrap: [AppComponent]
})
export class AppModule { }
