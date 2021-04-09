import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeInAnimation } from '../../animations/fade-in.animation';
import { sliderRouteAnimation } from '../../animations/slider-router.animation';
@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
  animations: [fadeInAnimation, sliderRouteAnimation]
})
export class AuthLayoutComponent {
  public copyrightDate = new Date().getFullYear();
  public isVisible = true;

  public tabs = [
    { title: 'Tab1', active: true },
    { title: 'Tab2', active: false },
  ];

  public selectedTab = 0;

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
