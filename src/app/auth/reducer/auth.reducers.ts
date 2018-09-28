
import * as fromAuthAction from '../actions/auth.actions';
import { User } from '../user.model';


export interface AuthState {
    user: User;
}

const initStateAuth: AuthState = {
    user: null
};

// reducer
export function AuthStateReducer (state =  initStateAuth, action: fromAuthAction.actions): AuthState {

    switch (action.type) {
        case  fromAuthAction.SET_USER: return {
            user: { ...action.user}
        };
        case  fromAuthAction.UNSET_USER: return {
            user: null
        };
        default: return state;
    }
}



