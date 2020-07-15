import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from './../../shared/models/categoty';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  // loading = false;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    // this.loading = true;
    this.categories$ = this.categoriesService.fetch()
    .pipe(delay(3000))
    // .subscribe((res) => {
    //   this.loading = false;
    //   this.categories = res;
    //   console.log(`Categories: ${res}`)
    // });
  }
}
