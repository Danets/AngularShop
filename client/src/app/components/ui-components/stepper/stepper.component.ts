import { Component, Input } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
})
export class StepperComponent extends CdkStepper {
  // @Input()
  // activeClass = 'active';

  isNextButtonHidden() {
    return !(this.steps.length === this.selectedIndex + 1);
  }
}
