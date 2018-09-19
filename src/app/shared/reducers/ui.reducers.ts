// mi funcion reducer
// primero se configura las acciones


// ocupar las actions
import * as fromActions from '../actions/ui.actions';

// estado de la interfaz de usuario
// lo ideal es manejarlo como un objeto
export interface State {
    isLoading: boolean;
}

// crear el estado inicial
const initState: State = {
    isLoading: false
};

// creando el reducer state estado_inicial
export function UIReducer( state = initState, action: fromActions.actions): State {
    switch ( action.type) {
        case fromActions.ACTIVAR_LOADING:
           // regresar siempre un nuevo estado
           // si existiese mas propiedades se deberia poner ... con esto se extrae todas
           return {
                isLoading: true
           };
        case fromActions.DESACTIVAR_LOADING:
            return {
                isLoading: false
            };
        default: return state;
    }
}
