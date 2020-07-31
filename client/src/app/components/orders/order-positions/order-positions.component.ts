import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PositionsService } from '../../../shared/services/positions.service';
import { Position } from './../../../shared/models/position';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css'],
})
export class OrderPositionsComponent implements OnInit {
  positions$: Observable<Position[]>;
  constructor(
    private positionsService: PositionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) =>
        this.positionsService.fetchPositions(params['id'])
      )
    );
  }
}
