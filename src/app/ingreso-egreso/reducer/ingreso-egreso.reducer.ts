
// importar las acciones de ingresos-egresos
import * as fromActionIngEgr from '../actions/ingreso-egreso.actions';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';
// import { acciones } from '../actions/ingreso-egreso.actions';
import { AppState } from '../../app.reducers';

// interface o apariencia
export interface IngresoEgresoState {
    items: IngresoEgresoModel[];
}

// se tiene que expandir el appState por que ahora
// debemos quitar el nodo que con lazyload no
// debemos cargarlo hasta que nos encontremos logeados

export interface AppStateIngresoEgreso extends AppState {
    ingEgreState: IngresoEgresoState;
}

// estado inicial
const estadoInicial: IngresoEgresoState = {
    items: []
};

// funcion ingreso egreso reducer
export function IngresoEgresoReducer( state = estadoInicial, action: fromActionIngEgr.acciones): IngresoEgresoState {

    switch ( action.type ) {
        case fromActionIngEgr.SET_ITEM:
            return {
                items: [
                    ...action.items.map( item => {
                         return { ...item };
                    })
                ]
            };
        case fromActionIngEgr.UNSET_ITEM:
            return {
                items: []
            };
        default: return state;
    }


}


