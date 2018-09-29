import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


// forms

// rutas
import { AppRountigModule } from './app-routing.module';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// definir lo del reducer
import { StoreModule } from '@ngrx/store';

// el reducer creado
import { appReducer } from './app.reducers';

// devtools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// ng chart Graficas
import { ChartsModule } from 'ng2-charts';

// modulos personalizados
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
     AppRountigModule,
     AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
     StoreModule.forRoot( appReducer ), // reducer
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
