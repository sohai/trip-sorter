import {
  AppActions,
  CLEAR_SEARCH_RESULT,
  LOAD_DEALS,
  LOAD_DEALS_SUCCESS,
  SEARCH
} from './actions';
import {AppState} from './reducers';
import {createSelector} from '@ngrx/store';
import {
  capitalizeFirstLetter,
  shortestPath
} from '../utils';

export interface Deal {
  transport: string;
  departure: string;
  arrival: string;
  duration: {
    h: string;
    m: string
  };
  cost: number;
  discount: number;
  reference: string;
  totalDuration?: number;
  price?: number;
}

export const initState = {
  items: [],
  result: [],
  departureCities: new Set(),
  arrivalCities: new Set(),
  graphFastest: {},
  graphCheapest: {}
};

const searchTypeToKeyProp = (type: string) => {
  if (!type) {
    return null;
  }
  if (type === 'cheapest') {
    return 'price';
  }
  if (type === 'fastest') {
    return 'totalDuration';
  }
};

export function dealsReducer(state: AppState['deals'] = initState, action: AppActions) {
  switch (action.type) {
    case LOAD_DEALS:
      return {...initState};
    case LOAD_DEALS_SUCCESS: {
      const graphFastest = {};
      const graphCheapest = {};
      action.payload.forEach(item => {
        const newItem = {...item};
        newItem.totalDuration = (+item.duration.h) * 60 * 60 + (+item.duration.m) * 60;
        newItem.price = item.cost * (item.discount > 0 ? (item.discount / 100) : 1);
        if (!graphFastest[item.departure]) {
          graphFastest[item.departure] = {};
        }
        if (!graphFastest[item.departure][item.arrival]
          || graphFastest[item.departure][item.arrival].totalDuration > newItem.totalDuration) {
          graphFastest[item.departure][item.arrival] = newItem;
        }
        if (!graphCheapest[item.departure]) {
          graphCheapest[item.departure] = {};
        }
        if (!graphCheapest[item.departure][item.arrival]
          || graphCheapest[item.departure][item.arrival].price > newItem.price) {
          graphCheapest[item.departure][item.arrival] = newItem;
        }
      });
      return {
        ...state,
        items: action.payload,
        departureCities: new Set(action.payload
          .map(item => item.departure)
          .sort((a, b) => a.localeCompare(b))
        ),
        arrivalCities: new Set(action.payload
          .map(item => item.arrival)
          .sort((a, b) => a.localeCompare(b))
        ),
        graphFastest,
        graphCheapest
      };
    }
    case SEARCH: {
      const result = shortestPath(state['graph' + capitalizeFirstLetter(action.payload.type)],
        action.payload.from, action.payload.to, searchTypeToKeyProp(action.payload.type), 'departure');
      return {
        ...state,
        result
      };
    }
    case CLEAR_SEARCH_RESULT:
      return {
        ...state,
        result: []
      };
    default:
      return state;
  }
}

export const getDealsState = state => state.deals;

export const getDepartureCites = createSelector(
  getDealsState,
  state => state.departureCities
);
export const getArrivalCites = createSelector(
  getDealsState,
  state => state.arrivalCities
);

export const getResult = createSelector(
  getDealsState,
  state => state.result
);

