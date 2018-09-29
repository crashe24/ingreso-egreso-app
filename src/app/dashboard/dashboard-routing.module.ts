import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashBoardRoutes } from './dashboard.routes';
// import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
       {path: '', component: DashboardComponent,
        children: dashBoardRoutes, }
       // canActivate: [AuthGuardService]}
 ] ;

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class DashboardRoutingModule { }
