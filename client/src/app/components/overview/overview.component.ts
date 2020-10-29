import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Overview } from 'src/app/shared/models/analytics';
import { AnalyticsService } from './../../shared/services/analytics.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
data$: Observable<Overview>;

  constructor(private service: AnalyticsService) { }

  ngOnInit(): void {
    this.data$ = this.service.getOverview();
    console.dir(this.data$)
  }

}
