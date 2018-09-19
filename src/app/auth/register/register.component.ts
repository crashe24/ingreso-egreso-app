import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subcription: Subscription;
  constructor( public _authService: AuthService,
               public store: Store<AppState>) { }

  ngOnInit() {
    // subscribir al cambio del state
    this.subcription = this.store.select('uiState')
    .subscribe( uiRespuesta => {
      this.cargando = uiRespuesta.isLoading;
    });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
  onSubmit(data: any) {
    this._authService.crearUsuario(data.nombre, data.email, data.password);

  }
}
