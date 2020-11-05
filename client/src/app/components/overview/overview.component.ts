import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ViewContainerRef
} from '@angular/core';
import { Observable } from 'rxjs';
import { Overview } from 'src/app/shared/models/analytics';
import { AnalyticsService } from './../../shared/services/analytics.service';
import {
  MaterialService,
  ModalInterface,
} from './../../shared/helpers/material.service';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit, AfterViewInit, OnDestroy {
  data$: Observable<Overview>;
  @ViewChild('tapTarget') tapTargetRef: ElementRef;
  tap: ModalInterface;
  yesterday = new Date();

  constructor(private service: AnalyticsService) {}

  ngOnInit(): void {
    this.data$ = this.service.getOverview();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  ngAfterViewInit() {
    // this.tap = MaterialService.initTapTarget(this.tapTargetRef);
  }

  ngOnDestroy() {
    // this.tap.destroy();
  }

  openTap() {
    this.tap.open();
  }
}
