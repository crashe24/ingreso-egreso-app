// Guard para proteccion de las rutas
// Es un servicio simple con la implementacion del canActive
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor( private router: Router,
              public _authService: AuthService) { }

  // impelementacion del metodo canActive
  // puede retornar un boolean una promesa o un observable
  // se lo debe poner en las rutas app.routing.ts
  canActivate() {
    // const autenticado = false;

    // // si no esta autenticado no pasa
    // if (autenticado) {
    //   this.router.navigate(['/login']);
    // }
    // return false;
    return this._authService.isAuth();
  }

  canLoad() {
    return this._authService.isAuth()
    .pipe (
      take(1) // aqui se dice que cuando este cargado se ejecute una ves y se lo dessubscriba
    );
  }


}
