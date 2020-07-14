import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { MaterialService } from '../../helpers/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css'],
})
export class SiteLayoutComponent implements AfterViewInit {
  @ViewChild('floatBtn') floatBtn: ElementRef;
  links = [
    { url: '/overview', name: 'Overview' },
    { url: '/analytics', name: 'Analytics' },
    { url: '/history', name: 'History' },
    { url: '/orders', name: 'Add order' },
    { url: '/categories', name: 'Category' },
  ];
  constructor(private auth: AuthService, private router: Router) {}

  ngAfterViewInit(): void {
    MaterialService.actionBtn(this.floatBtn);
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
