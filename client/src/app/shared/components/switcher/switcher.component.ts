import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.css']
})
export class SwitcherComponent {
  @Input() isSwitchOn = true;

  public onToogle (): void {
    this.isSwitchOn = !this.isSwitchOn;
  }

}
