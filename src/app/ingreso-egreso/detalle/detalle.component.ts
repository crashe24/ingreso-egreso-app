import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';

import swal from 'sweetalert2';
import { AppStateIngresoEgreso } from '../reducer/ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit , OnDestroy {

   ingEgresoItems: IngresoEgresoModel[];
   subscripcion: Subscription = new Subscription();
  constructor( private store: Store<AppStateIngresoEgreso>,
              public _ingresoEgrService: IngresoEgresoService) {
    this.subscripcion = store.select('ingEgreState')
    .subscribe( (ingresoEgreso: any) => {
      // console.log(ingresoEgreso);
      this.ingEgresoItems = ingresoEgreso.items;
    });

  }

  ngOnInit() {
  }

  borrarItem( item: IngresoEgresoModel ) {
    console.log( item.uid);
     this._ingresoEgrService.borrarIngresoEgreso(item.uid)
     .then( () => swal('Eliminado correctamente', item.descripcion, 'success'));
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }
}
