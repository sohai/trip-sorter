import {
  async,
  TestBed
} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {SearchFormComponent} from './search-form/search-form.component';
import {ResultComponent} from './result/result.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {StoreModule} from '@ngrx/store';
import {
  metaReducers,
  reducers
} from './store/reducers';
import {AppEffects} from './store/effects';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatSelectModule,
        MatFormFieldModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatListModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        EffectsModule.forRoot([
          AppEffects
        ])
      ],
      declarations: [
        SearchFormComponent,
        ResultComponent,
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
