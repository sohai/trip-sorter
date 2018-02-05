import {Injectable} from '@angular/core';
import {
  Actions,
  Effect
} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {
  catchError,
  map,
  switchMap
} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {
  AppState} from './reducers';
import {
  INIT,
  InitAction,
  LOAD_DEALS,
  LOAD_DEALS_ERROR,
  LoadDealsAction,
  LoadDealsErrorAction,
  LoadDealsSuccessAction
} from './actions';
import {defer} from 'rxjs/observable/defer';
import {of} from 'rxjs/observable/of';
import {MatSnackBar} from '@angular/material';
import {Deal} from './deals.reducer';

@Injectable()
export class AppEffects {


  @Effect()
  appInit$ = this.action$
    .ofType(INIT, LOAD_DEALS)
    .pipe(
      switchMap(() =>
        this.http.get<{ currency: string, deals: Deal[] }>('/assets/response.json')
          .pipe(
            map(res => new LoadDealsSuccessAction(res.deals)),
            catchError(e => of(new LoadDealsErrorAction()))
          )
      )
    );

  @Effect()
  loadDealsError$ = this.action$
    .ofType(LOAD_DEALS_ERROR)
    .pipe(
      switchMap(() => {
        const ref = this.matSnackBar.open(
          'Fetching deals error',
          'RELOAD'
        );
        return ref.onAction()
          .pipe(
            map(() => new LoadDealsAction())
          );
      })
    );

  @Effect()
  init$ = defer(() => {
    this.store.dispatch(new InitAction());
  });

  constructor(private action$: Actions,
              private http: HttpClient,
              private store: Store<AppState>,
              private matSnackBar: MatSnackBar) {

  }
}
