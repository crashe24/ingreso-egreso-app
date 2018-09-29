import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIngresoEgresoPipe } from './pipe/orden-ingreso-egreso.pipe';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';

// modulos personalizados
import { SharedModule } from '../shared/shared.module';

// rutas hijas en un modulo
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { IngresoEgresoReducer } from './reducer/ingreso-egreso.reducer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingreso-egreso', IngresoEgresoReducer) // esto se hace para que el nuevo nodo de
    // nuestro reducer que se esta carnado peresosamente aparesca solo cuando lo necesitemos
    // sirve para extender el store actual
  ],
  declarations: [
    DashboardComponent,
    DetalleComponent,
    EstadisticaComponent,
    IngresoEgresoComponent,
    OrdenIngresoEgresoPipe

  ]
})
export class IngresoEgresoModule { }
