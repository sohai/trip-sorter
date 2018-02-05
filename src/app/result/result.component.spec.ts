import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {ResultComponent} from './result.component';
import {
  MatIconModule,
  MatListModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {Deal} from '../store/deals.reducer';
import {SimpleChange} from '@angular/core';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultComponent],
      imports: [
        MatListModule,
        FlexLayoutModule,
        MatIconModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    component.items = [];
    component.ngOnChanges({
      items: new SimpleChange([], [
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
          reference: 'TLA0500',
          price: 160
        } as Deal,
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
          reference: 'TAW0515',
          price: 120
        } as Deal
      ], true)
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component);
    expect(component).toBeTruthy();
  });
  it('should have totalDuration', () => {
    expect(component.totalDuration.h).toBe(10);
    expect(component.totalDuration.m).toBe(15);
  });
  it('should have totalPrice', () => {
    expect(component.totalPrice).toBe(280);
  });
});
