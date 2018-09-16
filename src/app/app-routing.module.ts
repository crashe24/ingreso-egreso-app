import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashBoardRoutes } from './dashboard/dashboard.routes';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegisterComponent},
        {
            path: '', component: DashboardComponent,
            children: dashBoardRoutes,
            canActivate: [AuthGuardService]
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
