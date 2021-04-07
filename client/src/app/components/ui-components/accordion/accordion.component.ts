import { Component } from '@angular/core';
import { Card } from '../../../shared/models/card';
import { slideDownAnimation } from '../../../shared/animations/slide-down.animation';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  animations: [slideDownAnimation]
})
export class AccordionComponent {
  public cards: Card[] = [
    {
      title: 'Angular 11',
      content:
        'Learn one way to build applications with Angular and reuse your code and abilities to build apps for any deployment target.',
      isExpanded: false,
    },
    {
      title: 'RxJS',
      content:
        'RxJS is a library for composing asynchronous and event-based programs by using observable sequences.',
      isExpanded: false,
    },
  ];

  public onExpand(item: Card): void {
    item.isExpanded = !item.isExpanded;
  }
}
