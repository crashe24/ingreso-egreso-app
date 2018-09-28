import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string;
  subscription: Subscription = new Subscription();
  constructor(public _authService: AuthService,
    public _ingresoEgr: IngresoEgresoService,
              private store: Store<AppState>) {

                this.subscription = this.store.select('authState')
                .pipe(
                  filter( auth => auth.user != null)
                )
                .subscribe ( auth => {
                  this.nombre = auth.user.nombre;
                });
              }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
}

logout() {
  this._authService.logout();
  this._ingresoEgr.cancelarSubscriptioins();

}


}
