import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgresoModel } from './models/ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { filter, map } from 'rxjs/operators';
import { SetItemAction, UnSetItemAction } from './actions/ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService  implements OnDestroy {

  // subcripciones
  ingEgrSubscritpion: Subscription = new Subscription();
  dataSubscription: Subscription = new Subscription();
  constructor( private afDb: AngularFirestore, public _authService: AuthService
              , private store: Store<AppState>) { }

  // listener para escuchar los cambios
  initIngEgrListener() {
      // obtencion del usuario
     // const user = this._authService.getUsuario();
     // console.log(user.uid);
     this.store.select('authState')
     .pipe( // pipe para trasformar la data se puede utilizar el map
       filter( auth => auth.user != null) // filtro q obtine o que hace alguna validacion
     )
     .subscribe( auth => {
       // console.log(auth.user);
       this.obtenerItemsIngEgr(auth.user.uid);
     });
  }

  private obtenerItemsIngEgr( uid: string) {
    this.afDb.collection(`${ uid}/ingresos-egresos/items`)
    //   .valueChanges() // el value changes regresa el observable
    .snapshotChanges()
    .pipe ( map( docData => {
        return docData.map( refDoc => {
          return {
            uid: refDoc.payload.doc.id,
            ...refDoc.payload.doc.data()
          };
        });
    }))
    .subscribe( (colleccion: any[]) => {
      this.store.dispatch( new SetItemAction(colleccion));
    });
  }

  crearIngresoEgresoFS( ingresoEgreso: IngresoEgresoModel) {
    const usuarioObtenido = this._authService.getUsuario();
    return this.afDb.doc( `${usuarioObtenido.uid}/ingresos-egresos`)
    .collection('items').add({ ...ingresoEgreso});
  }
  // todas las funciones de firebase regresan promesas
  borrarIngresoEgreso (uid: string) {
    const usuarioObtenido = this._authService.getUsuario();
    return this.afDb.doc(`${usuarioObtenido.uid}/ingresos-egresos/items/${uid}`)
    .delete();
  }
  cancelarSubscriptioins() {
    this.ingEgrSubscritpion.unsubscribe();
    this.dataSubscription.unsubscribe();
    // purgar los items
    this.store.dispatch ( new UnSetItemAction());
  }

  ngOnDestroy() {
    this.cancelarSubscriptioins();
  }
}
