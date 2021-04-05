import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  public counter: number = 1;
  @Input() max = 10;
  @Input() min = 0;

  public onDecrement(): void {
    if (this.min < this.counter) {
      this.counter--;
    }
  }

  public onIncrement(): void {
    if (this.max > this.counter) {
      this.counter++;
    }
  }

}
