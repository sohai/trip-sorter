import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';
import {
  Deal,
  dealsReducer
} from './deals.reducer';
import {uiReducer} from './ui.reducer';

export interface AppState {
  ui: {
    loading: boolean
  };
  deals: {
    items: Deal[],
    result: Deal[],
    departureCities: Set<string>,
    arrivalCities: Set<string>,
    graphCheapest: {},
    graphFastest: {}
  };
}

export const reducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  deals: dealsReducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function (state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger, storeFreeze]
  : [];
