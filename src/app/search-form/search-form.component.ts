import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {MatButtonToggleChange} from '@angular/material';
import {
  map,
  startWith,
  takeUntil
} from 'rxjs/operators';
import {combineLatest} from 'rxjs/observable/combineLatest';

export interface SearchPayload {
  from: string;
  to: string;
  type: string;
}

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit, OnDestroy {

  @Input()
  departureCities: string[];
  @Input()
  arrivalCities: string[];
  @Input()
  resultCount: number;

  @Output()
  search = new EventEmitter<SearchPayload>();
  @Output()
  clear = new EventEmitter<Event>();

  sortChange$ = new Subject<MatButtonToggleChange>();
  form: FormGroup;

  private destroy$ = new Subject<boolean>();

  ngOnInit() {
    this.form = new FormGroup({
      arrivalFormControl: new FormControl('', [
        Validators.required
      ]),
      departureFormControl: new FormControl('', [
        Validators.required
      ])
    });

    combineLatest(
      this.sortChange$
        .pipe(
          map(event => event.value),
          startWith('cheapest')
        ),
      this.form.get('departureFormControl').valueChanges,
      this.form.get('arrivalFormControl').valueChanges
    )
      .pipe(
        map(arr => ({from: arr[1], to: arr[2], type: arr[0]})),
        takeUntil(this.destroy$)
      )
      .subscribe(val => this.search.next(val));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onClear() {
    this.clear.next();
    this.form.get('departureFormControl').reset();
    this.form.get('arrivalFormControl').reset();
  }

}
