import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiComponentsRoutingModule } from './ui-components-routing.module';

import { UiComponentsComponent } from './ui-components.component';
import { AccordionComponent } from './accordion/accordion.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { StarRatingComponent } from './star-rating/star-rating.component';

@NgModule({
  declarations: [
    UiComponentsComponent,
    AccordionComponent,
    ProgressbarComponent,
    StarRatingComponent,
  ],
  imports: [
    CommonModule,
    UiComponentsRoutingModule
  ],
})
export class UiComponentsModule { }
