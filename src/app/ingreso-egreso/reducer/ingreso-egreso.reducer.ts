
// importar las acciones de ingresos-egresos
import * as fromActionIngEgr from '../actions/ingreso-egreso.actions';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';
// import { acciones } from '../actions/ingreso-egreso.actions';

// interface o apariencia
export interface IngresoEgresoState {
    items: IngresoEgresoModel[];
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


