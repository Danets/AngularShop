import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent {
  @Input() stars: number;

  private maxAmount: number = 5;

  public get allStars(): number[] {
    const totalStars = Math.floor(this.stars);
    return Array(totalStars).fill(0);
  }

  public get hasHalfStars(): boolean {
    const halfStars = (this.stars - Math.floor(this.stars) >= 0.5) && this.stars !== this.maxAmount;
    return halfStars; 
  }

  public get emptyStars(): number[] {
    const emptyStars =  Math.floor(this.maxAmount - this.stars);
    return Array(emptyStars).fill(0); 
  }
}
