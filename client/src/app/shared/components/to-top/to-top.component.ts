import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-top',
  templateUrl: './to-top.component.html',
  styleUrls: ['./to-top.component.css']
})
export class ToTopComponent implements OnInit {
  public isVisibleBtn = false;

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll') onScroll() {
    const scrollY = this.viewportScroller.getScrollPosition()[1];
    this.isVisibleBtn = scrollY > 60;
    // if (scrollY === 64) {
    //   this.isVisibleBtn = true;
    // } else {
    //   this.isVisibleBtn = false;
    // }
  }

  public onToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  } 

}
