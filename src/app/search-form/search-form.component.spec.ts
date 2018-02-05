import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {SearchFormComponent} from './search-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatButtonToggleChange,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatOptionModule,
        MatButtonModule,
        MatSelectModule,
        FlexLayoutModule,
        MatButtonToggleModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    component.arrivalCities = ['London', 'Paris', 'Warsow'];
    component.departureCities = ['London', 'Paris', 'Warsow'];
    component.resultCount = 2;
    component.ngOnInit();
    component.form.get('departureFormControl').setValue('London');
    component.form.get('arrivalFormControl').setValue('Warsow');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear form and emit clear on reset click', async(() => {
    spyOn(component.clear, 'next');
    const resetBtn = fixture.debugElement.nativeElement.querySelector('.mat-button');
    resetBtn.click();
    fixture.whenStable().then(() => {
      expect(component.clear.next).toHaveBeenCalled();
      expect(component.form.get('departureFormControl').pristine).toBeTruthy();
      expect(component.form.get('arrivalFormControl').pristine).toBeTruthy();
    });
  }));

  it('should emit search event on sort change', () => {
    component.form.get('departureFormControl').setValue('Paris');
    component.form.get('arrivalFormControl').setValue('London');
    fixture.detectChanges();
    component.sortChange$.next({value: 'fastest'} as MatButtonToggleChange);
    component.search.subscribe(res => {
      exports(res.type).toBe('fastest');
    });
  });
  it('should emit search event on departure change', () => {
    component.search.subscribe(res => {
      exports(res.departure).toBe('Paris');
    });
    component.form.get('departureFormControl').setValue('Paris');
  });
  it('should emit search event on arrival change', () => {
    component.search.subscribe(res => {
      exports(res.arrival).toBe('Paris');
    });
    component.form.get('arrivalFormControl').setValue('Paris');
  });
  it('should not emit search event with form error', () => {
    spyOn(component.search, 'next');
    fixture.whenStable().then(() => {
      expect(component.search.next).not.toHaveBeenCalled();
    });
    component.form.get('arrivalFormControl').setValue('');
  });

});
