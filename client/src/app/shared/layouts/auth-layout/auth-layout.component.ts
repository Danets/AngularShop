import { Component } from '@angular/core';
import { fadeInAnimation } from '../../animations/fade-in.animation';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
  animations: [fadeInAnimation]
})
export class AuthLayoutComponent {
  public copyrightDate = new Date().getFullYear();
  public isVisible = true;

  public tabs = [
    { title: 'Tab1', active: true },
    { title: 'Tab2', active: false },
  ];

  public selectedTab = 0;
}
