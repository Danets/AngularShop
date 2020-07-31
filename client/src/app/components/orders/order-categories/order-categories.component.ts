import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories.service';
import { Category } from './../../../shared/models/categoty';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css'],
})
export class OrderCategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  loading: boolean = false;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch();
  }
}
