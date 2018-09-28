import { Action } from '@ngrx/store';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';

export const SET_ITEM = '[ingreso-egreso] set Item';
export const UNSET_ITEM = '[ingreso-egreso] unset Item';

export class SetItemAction implements Action {
    readonly type = SET_ITEM;

    constructor( public items: IngresoEgresoModel[]) {}

}
// purgar todos los elementos
export class UnSetItemAction implements Action {
    readonly type = UNSET_ITEM;
}

// exportar las acciones permitidas
export type acciones = SetItemAction | UnSetItemAction;


