import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent {
  @Input() tabs: { title: string; active: boolean }[] = [];
  @Output() onSelected: EventEmitter<number> = new EventEmitter();

  public onSelect(
    selected: { title: string; active: boolean },
    idx: number
  ): void {
    this.tabs.forEach((tab) => {
      tab.active = selected === tab;
    });
    this.onSelected.emit(idx);
  }
}
