import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
})
export class AuthLayoutComponent {
  public copyrightDate = new Date().getFullYear();

  public tabs = [
    { title: 'Tab1', active: true },
    { title: 'Tab2', active: false },
  ];

  public selectedTab = 0;
}
