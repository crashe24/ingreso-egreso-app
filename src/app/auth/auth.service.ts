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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFire: AngularFireAuth,
              private router: Router,
              private afDb: AngularFirestore) { }

  // para escuchar el usuario conectado cambie su estado
  // se debe lanzar una sola ves y es por eso que se debe poner en el app.component.ts
  initAuthListener() {
    this.angularFire.authState
      .subscribe( (fbuser: firebase.User) => {
        console.log('entro hasta el servicio de usuario');
        console.log( fbuser );
      });
  }

  crearUsuario(nombre: string, email: string, password: string) {
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

      console.log(user);
      this.afDb.doc(`${user.uid}/usuario`) // estructura de creacion del documento
      .set( user ) // aqui remplazare toda la infromacion que se encuentra ahi por la que enviamos ahorita
      .then( () => {
        this.router.navigate(['/']);
      })
      .catch( error => console.log(error));

      // this.router.navigate(['/dashboard']);
    })
    .catch( error => {
      console.error(error);
    });
  }

  logIn(email: string, password: string) {
    this.angularFire.auth.signInWithEmailAndPassword( email, password)
    .then ( respuesta => {
       // console.log(respuesta);
        this.router.navigate(['/dashboard']);
        swal('Login', 'Exito en la autenticacion', 'success');
    })
    .catch ( error => {
     // console.log('Entro al error');
     // console.error( error);
      swal('Login', 'Error en la autenticacion', 'error');
      this.router.navigate(['/login']);
    });
  }

  logout() {
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
}
