import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {Deal} from '../store/deals.reducer';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent implements OnChanges {

  @Input()
  items: Deal[];

  totalDuration = {h: 0, m: 0};
  totalPrice = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      const items = changes['items'].currentValue;

      this.totalDuration = items
        .reduce((acc, i) => {
          acc.h = acc.h + +(i.duration.h);
          acc.m = acc.m + +(i.duration.m);
          return acc;
        }, {h: 0, m: 0});

      this.totalPrice = items
        .map(item => item.price)
        .reduce((acc, i) => acc + i, 0);
    }
  }

  getTransportIcon(transport: string) {
    if (transport === 'train') {
      return 'train';
    }
    if (transport === 'bus') {
      return 'directions_bus';
    }
    if (transport === 'car') {
      return 'local_taxi';
    }
  }
}
