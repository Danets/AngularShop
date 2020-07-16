import { Category } from './../../../shared/models/categoty';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/helpers/material.service';
import { ReadVarExpr } from '@angular/compiler';

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

  constructor(
    private route: ActivatedRoute,
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
    const file = event.target.files[0];
    this.image = file;

    // here is we uses Filereader for showing preview image 
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {}
}
