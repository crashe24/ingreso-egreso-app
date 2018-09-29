import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
 import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegisterComponent},
        {
        path: '',
        // esto es para la carga lazyload o peresoso
        loadChildren: './ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule',
        canLoad: [AuthGuardService]
        },
        {path: '**', redirectTo: ''}

];



@NgModule({
    imports: [
        RouterModule.forRoot ( routes)
    ],
    exports: [
        RouterModule
    ]
})
// sirve para importar en el app.module para decirle que ahora dispone de estas rutas
export class AppRountigModule {

}
