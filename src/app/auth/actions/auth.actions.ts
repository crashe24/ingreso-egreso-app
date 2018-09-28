import { Action } from '@ngrx/store';
import { User } from '../user.model';

// actions para el auth
export const SET_USER = '[Auth] set User';
export const UNSET_USER = '[Auth] unset User';

export class SetUserAction implements Action {
    readonly type =  SET_USER;

    constructor ( public user: User) {}
}
export class UnSetUserAction implements Action {
    readonly type =  UNSET_USER;

    constructor () {}
}

export type actions = SetUserAction | UnSetUserAction;
