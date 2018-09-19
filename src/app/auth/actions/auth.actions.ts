import { Action } from '@ngrx/store';
import { User } from '../user.model';

// actions para el auth
export const SET_USER = '[Auth] set User';

export class SetUserAction implements Action {
    readonly type =  SET_USER;

    constructor ( public user: User) {}
}

export type actions = SetUserAction;
