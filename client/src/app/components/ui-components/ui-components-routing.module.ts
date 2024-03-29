import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UiComponentsComponent } from './ui-components.component';
import { AccordionComponent } from './accordion/accordion.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { CarouselComponent } from './carousel/carousel.component';
import { LightboxComponent } from './lightbox/lightbox.component';
import { SliderComponent } from './slider/slider.component';

const routes: Routes = [
  {
    path: '',
    component: UiComponentsComponent,
    children: [
      { path: 'cards', component: AccordionComponent },
      { path: 'progress', component: ProgressbarComponent },
      { path: 'rating', component: StarRatingComponent },
      { path: 'slider', component: CarouselComponent },
      { path: 'lightbox', component: LightboxComponent },
      { path: 'range', component: SliderComponent },                                                                
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiComponentsRoutingModule { }
