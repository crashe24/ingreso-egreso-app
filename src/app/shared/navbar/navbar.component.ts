import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombre: string;
  subscription: Subscription = new Subscription();
  constructor( private store: Store<AppState>) {
    this.subscription = this.store
    .select('authState')
    .pipe(
      filter( auth => auth.user != null)
    )
    .subscribe( (auth) => {
          this.nombre = auth.user.nombre;
    });
   }

  ngOnInit() {
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

}
