import {Action} from '@ngrx/store';
import {Deal} from './deals.reducer';

export const SEARCH = '[App] Search action';
export const LOAD_DEALS = '[App] Load deals';
export const LOAD_DEALS_SUCCESS = '[App] Load deals success';
export const LOAD_DEALS_ERROR = '[App] Load deals error';
export const INIT = '[App] Init';
export const CLEAR_SEARCH_RESULT = '[App] Clear search result';

export class InitAction implements Action {
  readonly type = INIT;
}

export class LoadDealsAction implements Action {
  readonly type = LOAD_DEALS;
}

export class LoadDealsSuccessAction implements Action {
  readonly type = LOAD_DEALS_SUCCESS;

  constructor(public payload: Deal[]) {
  }
}

export class LoadDealsErrorAction implements Action {
  readonly type = LOAD_DEALS_ERROR;
}

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: { from: string, to: string, type: string }) {

  }
}

export class ClearSearchResultAction implements Action {
  readonly type = CLEAR_SEARCH_RESULT;
}

export type AppActions = SearchAction
  | LoadDealsSuccessAction
  | LoadDealsErrorAction
  | LoadDealsAction
  | InitAction
  | ClearSearchResultAction;
