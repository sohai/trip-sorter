import {
  AppActions,
  LOAD_DEALS_ERROR,
  LOAD_DEALS_SUCCESS
} from './actions';
import {AppState} from './reducers';
import {createSelector} from '@ngrx/store';

const initState = {
  loading: true
};

export function uiReducer(state: AppState['ui'] = initState, action: AppActions) {
  switch (action.type) {
    case LOAD_DEALS_SUCCESS:
    case LOAD_DEALS_ERROR:
      return {...state, loading: false};
    default:
      return state;
  }
}

export const getUiState = state => state.ui;

export const getUiLoading = createSelector(
  getUiState,
  state => state.loading
);
