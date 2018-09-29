import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
// import { AppState } from '../../app.reducers';
import { Subscription } from 'rxjs';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';
import { AppStateIngresoEgreso } from '../reducer/ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos: number;
  egresos: number;

  totalIngresos: number;
  totalEgresos: number;

  subcritpion: Subscription = new Subscription();

  // Doughnut
  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];


  constructor( public store: Store<AppStateIngresoEgreso>) {

  }

  ngOnInit() {
    this.subcritpion = this.store.select('ingEgreState')
    .subscribe( (ingresoEgreso => {
        this.contarIngEgr( ingresoEgreso.items);
    }));
  }

  ngOnDestroy() {
    this.subcritpion.unsubscribe();
  }
  contarIngEgr( items: IngresoEgresoModel[]) {
      // siempre se tiene que recalcular
      // por borrado de la base
      // por eliminacion y agregacion de detalles
      this.ingresos = 0;
      this.egresos = 0;

      this.totalEgresos = 0;
      this.totalIngresos = 0;

      items.forEach( (item) => {
        if ( item.tipo === 'ingreso') {
          // sumar los montos
          this.ingresos += item.monto;
          // contar los items
          this.totalIngresos ++;
        } else {
          // sumar los montos
          this.egresos += item.monto;
          // contar los items
          this.totalEgresos ++;
        }
      });

      // para calcular los datos de la grafica
      this.doughnutChartData = [this.ingresos, this.egresos];

  }
}
