import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0, transform: "scale(0.5)" }),
        animate('300ms', style({ opacity: 1, transform: "scale(1)" }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0, transform: "scale(0.5)" }))
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit {
  // @Input() slides;

  public slides = [
    'https://source.unsplash.com/7BLRSG-AkJs',
    'https://source.unsplash.com/rcJbbK5_iIA',
    'https://source.unsplash.com/yQUwIlUeU4o',
    'https://source.unsplash.com/MlaQmWvzRTw',
    'https://source.unsplash.com/6dTpYUcr1yg',
    'https://source.unsplash.com/EyEdZ2aKRfA',
    'https://source.unsplash.com/qkJ4kHexI2o',
    'https://source.unsplash.com/XrO6WBflFRo'
  ];

  currentSlide = 0;

  constructor() {}

  ngOnInit() {
    this.preloadImages(); // for the demo
  }

  preloadImages() {
    for (const slide of this.slides) {
      new Image().src = slide;
    }
  }

  public onPreviousClick(): void {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
  }

  public onNextClick(): void  {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
  }

}
