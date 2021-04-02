import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader-circular-custom',
  templateUrl: './loader-circular-custom.component.html',
  styleUrls: ['./loader-circular-custom.component.css'],
})
export class LoaderCircularCustomComponent {
  @Input() isLoading = false;
}
