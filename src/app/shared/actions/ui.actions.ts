import { Action } from '@ngrx/store';

// acciones de mi redux

// 1.accion
export const ACTIVAR_LOADING = '[UI loading] Cargando...';
export const DESACTIVAR_LOADING = '[UI loading] Fin de Carga...';

// 2 crear las clases que me permitan crear las acciones de forma automatica
export class ActivarLoadingAction implements Action {
    readonly type =  ACTIVAR_LOADING;
}
export class DesactivarLoadingAction implements Action {
    readonly type =  DESACTIVAR_LOADING;
}

// 3. pasar al reducer para que vea que son validas
export type actions = ActivarLoadingAction | DesactivarLoadingAction;
