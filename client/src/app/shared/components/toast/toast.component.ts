import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  public isShow = false;

  constructor() {}

  ngOnInit(): void {
    this.initToast();
  }

  public initToast(): void {
    setTimeout(() => {
      this.isShow = true;
    }, 3000);
    setTimeout(() => {
      this.onCloseToast();
    }, 6000);
  }

  public onCloseToast(): void {
    this.isShow = false;
    // this.initToast();
  }
}
