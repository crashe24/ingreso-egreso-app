import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgresoModel } from './models/ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/actions/ui.actions';
import { AppStateIngresoEgreso } from './reducer/ingreso-egreso.reducer';

// swelalert


@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  // para manejar el formulario reactivo
  formulario: FormGroup;
  tipo = 'ingreso';
  loadingSubscription = new Subscription();
  loading: boolean;

  constructor( public _ingresoEgresoService: IngresoEgresoService,
               public store: Store<AppStateIngresoEgreso>) { }

  ngOnInit() {

    // subscribirme al store
    this.loadingSubscription = this.store.select('uiState')
    .subscribe( ui => {
        this.loading = ui.isLoading;
    });
    this.formulario = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, (Validators.min(0), Validators.required))
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
  crearIngresoEgreso() {

    this.store.dispatch( new ActivarLoadingAction());
    // ahora nos toca coger el objeto del formulario
    const formularioIngreso = new IngresoEgresoModel({ ...this.formulario.value, tipo: this.tipo});
    // console.log(formularioIngreso);
    this._ingresoEgresoService.crearIngresoEgresoFS( formularioIngreso )
    .then (
      () => {
        this.store.dispatch( new DesactivarLoadingAction());
        swal( 'Creado', formularioIngreso.descripcion, 'success' );
      }
    )
    .catch( err => {
      console.log(err);
      this.store.dispatch( new DesactivarLoadingAction());
    });
    this.formulario.reset({ monto: 0});
  }

}
