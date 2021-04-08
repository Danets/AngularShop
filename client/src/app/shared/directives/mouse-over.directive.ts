import { Directive, HostListener, ElementRef } from '@angular/core';
import {
  AnimationBuilder,
  AnimationMetadata,
  style,
  animate,
} from '@angular/animations';

@Directive({
  selector: '[appMouseOver]',
})
export class MouseOverDirective {
  @HostListener('mouseover') mouse() {
    this.playAnimation(this.getMouseOverAnimation());
  }

  @HostListener('mouseout') mouseOut() {
    this.playAnimation(this.getMouseOutAnimation());
  }

  constructor(private builder: AnimationBuilder, private el: ElementRef) {}

  private playAnimation(animationMetaData: AnimationMetadata[]): void {
    const animation = this.builder.build(animationMetaData);
    const player = animation.create(this.el.nativeElement);
    player.play();
  }

  private getMouseOutAnimation(): AnimationMetadata[] {
    return [animate('400ms ease-in', style({ transform: 'translateX(0) scale(1)' }))];
  }

  private getMouseOverAnimation(): AnimationMetadata[] {
    return [animate('400ms ease-in', style({ transform: 'translateX(100px) scale(1.2)' }))];
  }
}