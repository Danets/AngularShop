import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public isFilter = false

  constructor() { }

  ngOnInit(): void {
  }

  onOpenModal(): void {
    this.isFilter = !this.isFilter;
  }

}
