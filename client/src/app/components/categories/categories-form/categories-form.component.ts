import { Category } from './../../../shared/models/categoty';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/helpers/material.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css'],
})
export class CategoriesFormComponent implements OnInit {
  editMode: boolean = false;
  form: FormGroup;
  @ViewChild('uploadfile') uploadElem: ElementRef;
  image: File;
  imagePreview = '';
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
    this.form.disable();

    // HERE IS DINAMIC WAY GETTING DATA FROM PARAMS
    // this.route.params.subscribe((params: Params) => {
    //   if (params['id']) {
    //     this.editMode = true;
    //   } else {
    //   }
    // });

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.editMode = true;
            return this.categoriesService.getById(params['id']);
          } else {
            return of(null);
          }
        })
      )
      .subscribe(
        (category: Category) => {
          if (category) {
            this.form.patchValue({
              name: category.name,
            });
            this.imagePreview = category.srcUrl;
            this.category = category;
            MaterialService.reInitTextField();
          }
          this.form.enable();
        },
        (error) => MaterialService.handleError(error.error.message)
      );
  }

  triggerClick() {
    this.uploadElem.nativeElement.click();
  }

  onUpload(event: any) {
    this.image = event.target.files[0];
    // this.image = file;

    // here is we uses Filereader for showing preview image
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        const arr = new Uint8Array(reader.result).subarray(0, 4);
      } else {
        this.imagePreview = reader.result;
        throw new Error('Unexpected result');
      }
    };

    reader.readAsDataURL(this.image);
  }

  onSubmit() {
    let subs$;
    if (!this.editMode) {
      subs$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      subs$ = this.categoriesService.update(
        this.category._id,
        this.form.value.name,
        this.image
      );
    }
    subs$.subscribe(
      (category) => {
        this.category = category;
      },
      (error) => MaterialService.handleError(error.error.message)
    );
  }

  onRemove() {
    const agree = window.confirm(
      `Do you want to delete ${this.category.name}?`
    );
    if (agree) {
      this.categoriesService.remove(this.category._id).subscribe(
        (res) => {
          MaterialService.handleError(res.message);
          this.router.navigateByUrl('/categories');
        },
        (error) => MaterialService.handleError(error.error.message)
      );
    }
  }
}
