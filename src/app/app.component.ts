import {
  Component,
  OnInit
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './store/reducers';
import {
  Deal,
  getArrivalCites,
  getDepartureCites,
  getResult
} from './store/deals.reducer';
import {Observable} from 'rxjs/Observable';
import {
  ClearSearchResultAction,
  SearchAction
} from './store/actions';
import {SearchPayload} from './search-form/search-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  arrivalCitie$: Observable<Set<string>>;
  departureCitie$: Observable<Set<string>>;
  result$: Observable<Deal[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.arrivalCitie$ = this.store.select(getArrivalCites);
    this.departureCitie$ = this.store.select(getDepartureCites);
    this.result$ = this.store.select(getResult);

  }

  search(params: SearchPayload) {
    this.store.dispatch(new SearchAction(params));
  }

  clearResult() {
    this.store.dispatch(new ClearSearchResultAction());
  }

}

