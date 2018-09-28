import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

// importar las interfaces de firebase
 import * as firebase from 'firebase';

 // importar el map para poder trabajar con la respuesta del firebase
 import { map } from 'rxjs/operators';

// firebase.user.name firebase.email firebase.uid
// switalert2
import swal from 'sweetalert2';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/actions/ui.actions';
import { SetUserAction, UnSetUserAction } from './actions/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();
  private usuario: User;
  constructor(private angularFire: AngularFireAuth,
              private router: Router,
              private afDb: AngularFirestore,
              private store: Store<AppState>) { }

  // para escuchar el usuario conectado cambie su estado
  // se debe lanzar una sola ves y es por eso que se debe poner en el app.component.ts
  initAuthListener() {
    this.angularFire.authState
      .subscribe( (fbuser: firebase.User) => {
        if (fbuser) {
          // para el redux necesitamos un documento con
          // el user eso se lo obtiene de la bdd del
          // firebase medinate el doc
          // el valuechanges sirve para notificar cualquier cambio que tenga el user en firebase
          this.userSubscription = this.afDb.doc(`${fbuser.uid}/usuario`).valueChanges() // regresa un observable
          .subscribe( (usuarioObj: any) => {
              const newUser = new User( usuarioObj );
              // realizar el dispatch
              this.store.dispatch (new SetUserAction( newUser));
              this.usuario = newUser;
          });
        } else {
          // cuando no exsita o se desauntetique el usuario
          this.usuario = null;
          this.userSubscription.unsubscribe();
        }
      });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    // AQUI CONFIGURAR EL DISPATCH
    this.store.dispatch( new ActivarLoadingAction());

    this.angularFire.auth.createUserWithEmailAndPassword(email, password)
    .then( respuesta => {
      // aqui vamos a crear el usuario
      const user: User = {
        uid: respuesta.user.uid,
        nombre: nombre,
        email: email
      };
      // ahora vamos a subir el usuario a firebase
      // para esto necesitamos de la base de firebas
      // vamos acrear los niveles

      this.afDb.doc(`${user.uid}/usuario`) // estructura de creacion del documento
      .set( user ) // aqui remplazare toda la infromacion que se encuentra ahi por la que enviamos ahorita
      .then( () => {
        this.router.navigate(['/']);
        // DESACTIVAR EL LOADNING
        this.store.dispatch( new DesactivarLoadingAction());
      })
      .catch( error => console.log(error));

      // this.router.navigate(['/dashboard']);
    })
    .catch( error => {
      console.error(error);
      // TAMBIEN SE DEBE DESACTIVAR EL LOADNING
      this.store.dispatch( new DesactivarLoadingAction());
    });
  }

  logIn(email: string, password: string) {
    this.store.dispatch( new ActivarLoadingAction());
    this.angularFire.auth.signInWithEmailAndPassword( email, password)
    .then ( respuesta => {
       // console.log(respuesta);
        this.router.navigate(['/dashboard']);
        swal('Login', 'Exito en la autenticacion', 'success');
        this.store.dispatch( new DesactivarLoadingAction());

    })
    .catch ( error => {
     // console.log('Entro al error');
     // console.error( error);
      swal('Login', 'Error en la autenticacion', 'error');
      this.store.dispatch( new DesactivarLoadingAction());
      this.router.navigate(['/login']);

    });
  }

  logout() {
    // para purgar los estados
    this.store.dispatch( new UnSetUserAction());
    this.router.navigate(['/login']);
    this.angularFire.auth.signOut();
  }

  // para verificar que se encuentre logeado
  isAuth() {
      // necesitamos el observable del usuario logeado
      // el .pipe sirve para transformar la data obtenida
     return this.angularFire.authState
      .pipe (
        map( fbUser => {
          if (fbUser == null) {
                this.router.navigate(['/login']);
          }
          return fbUser != null;
        })
      );


  }

  getUsuario() {
    return { ...this.usuario};
  }
}
