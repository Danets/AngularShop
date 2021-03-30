import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiComponentsRoutingModule } from './ui-components-routing.module';

import { UiComponentsComponent } from './ui-components.component';
import { AccordionComponent } from './accordion/accordion.component';

@NgModule({
  declarations: [
    UiComponentsComponent,
    AccordionComponent,
  ],
  imports: [
    CommonModule,
    UiComponentsRoutingModule
  ],
  exports: [
    UiComponentsComponent,
  ]
})
export class UiComponentsModule { }
