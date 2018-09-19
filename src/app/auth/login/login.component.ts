import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  // subscription para controlar fugas de memoria en el ngoninit
  subcription: Subscription;

  constructor(public _authService: AuthService,
              public store: Store<AppState>) { }

  ngOnInit() {
     // subscribir al cambio del state
     this.subcription =
     this.store.select('uiState')
     .subscribe( uiRespuesta => {
       this.cargando = uiRespuesta.isLoading;
     });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
  submit(forma: any) {
     if (forma.invalid) {
        return;
      }
      this._authService.logIn(forma.email, forma.password);
  }

}
