import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  labels: string[] = ["25", "50", "75"];
  thumbPosition: number = 0.3;

  isDragStarted: boolean = false;

  getLabelXPosition(i: number): number {
    return (this.getTotalWidth() / (this.labels.length + 1)) * (i + 1);
  }

  public getTotalWidth(): number {
    const slider = document.querySelector("#wrapper");
    if (slider) {
      return slider.clientWidth;
    } else {
      return 0;
    }
  }

  public getThumbPosition(): number {
    return this.thumbPosition * this.getTotalWidth();
  }

  public getLineWidth(): string {
    return this.getThumbPosition() + 'px';
  }

  private updateThumbPosition(position: number): void {
    this.thumbPosition = position/this.getTotalWidth();
  }

  // listener for the mousedown event
  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: any): void {
    // signals the start of dragging
    this.isDragStarted = true;
    // common function that will be used for updating the thumb position
    this.updateThumbPosition(event.offsetX);
    this.getLineWidth();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
