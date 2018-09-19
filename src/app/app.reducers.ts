// archivo que tiene toda la definicio global del estado

// importar la interfaz de usuario
import * as fromReducer from '../app/shared/reducers/ui.reducers';
// tengo un nuevo reducer
import * as fromAuth from '../app/auth/reducer/auth.reducers';

import { ActionReducerMap } from '@ngrx/store';

// estado completo de la aplicacion
export interface AppState {
    uiState: fromReducer.State;
    authState: fromAuth.AuthState;
}

// configuracion global de los reducers
// esta libreria permite fusionar varios reducers en uno solo
export const appReducer: ActionReducerMap<AppState> = {
    uiState: fromReducer.UIReducer,
    authState: fromAuth.AuthStateReducer
};

