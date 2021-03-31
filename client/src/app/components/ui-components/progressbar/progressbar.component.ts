import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent {
  @Input() value: number = 15;

  @Input() maxValue: number = 100;

  public onUpdate(): void {
    this.value = 75;
  }

}
