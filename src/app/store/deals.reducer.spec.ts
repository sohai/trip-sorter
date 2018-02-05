import {
  Deal,
  dealsReducer,
  initState
} from './deals.reducer';
import {
  LoadDealsSuccessAction,
  SearchAction
} from './actions';

describe('Deals reducer', () => {
  const deals: Deal[] = [
    {
      transport: 'train',
      departure: 'London',
      arrival: 'Amsterdam',
      duration: {
        h: '05',
        m: '00'
      },
      cost: 160,
      discount: 0,
      reference: 'TLA0500'
    },
    {
      transport: 'bus',
      departure: 'London',
      arrival: 'Amsterdam',
      duration: {
        h: '07',
        m: '45'
      },
      cost: 40,
      discount: 25,
      reference: 'BLA0745'
    },
    {
      transport: 'car',
      departure: 'London',
      arrival: 'Amsterdam',
      duration: {
        h: '04',
        m: '45'
      },
      cost: 120,
      discount: 0,
      reference: 'CLA0445'
    },
    {
      transport: 'train',
      departure: 'London',
      arrival: 'Paris',
      duration: {
        h: '04',
        m: '30'
      },
      cost: 160,
      discount: 0,
      reference: 'TLP0430'
    },
    {
      transport: 'bus',
      departure: 'London',
      arrival: 'Paris',
      duration: {
        h: '05',
        m: '30'
      },
      cost: 40,
      discount: 50,
      reference: 'BLP0530'
    },
    {
      transport: 'car',
      departure: 'London',
      arrival: 'Paris',
      duration: {
        h: '04',
        m: '15'
      },
      cost: 120,
      discount: 0,
      reference: 'CLP0415'
    },
    {
      transport: 'train',
      departure: 'Amsterdam',
      arrival: 'Warsaw',
      duration: {
        h: '05',
        m: '15'
      },
      cost: 160,
      discount: 25,
      reference: 'TAW0515'
    },
    {
      transport: 'bus',
      departure: 'Amsterdam',
      arrival: 'Warsaw',
      duration: {
        h: '05',
        m: '15'
      },
      cost: 40,
      discount: 25,
      reference: 'BAW0515'
    },
    {
      transport: 'car',
      departure: 'Amsterdam',
      arrival: 'Warsaw',
      duration: {
        h: '04',
        m: '45'
      },
      cost: 120,
      discount: 0,
      reference: 'CAW0445'
    },
    {
      transport: 'train',
      departure: 'Amsterdam',
      arrival: 'Brussels',
      duration: {
        h: '05',
        m: '30'
      },
      cost: 160,
      discount: 0,
      reference: 'TAB0530'
    },
    {
      transport: 'bus',
      departure: 'Amsterdam',
      arrival: 'Brussels',
      duration: {
        h: '05',
        m: '45'
      },
      cost: 40,
      discount: 0,
      reference: 'BAB0545'
    },
    {
      transport: 'car',
      departure: 'Amsterdam',
      arrival: 'Brussels',
      duration: {
        h: '04',
        m: '30'
      },
      cost: 120,
      discount: 0,
      reference: 'CAB0430'
    }
  ];

  it('LOAD_DEALS_SUCCESS', () => {
    const newState = dealsReducer(initState, new LoadDealsSuccessAction(deals));
    expect(newState.graphFastest['London']['Amsterdam'].reference).toBe('CLA0445');
    expect(newState.graphFastest['London']['Amsterdam'].totalDuration).toBe(17100);
    expect(newState.graphFastest['London']['Amsterdam'].price).toBe(120);
    expect(newState.graphCheapest['London']['Amsterdam'].reference).toBe('BLA0745');
  });

  it('SEARCH', () => {
    let newState = dealsReducer(initState, new LoadDealsSuccessAction(deals));
    newState = dealsReducer(newState, new SearchAction({from: 'London', to: 'Amsterdam', type: 'fastest'}));

    expect(newState.result.length).toBeGreaterThan(0);
    expect(newState.result[0].reference).toBe('CLA0445');
  });
});
