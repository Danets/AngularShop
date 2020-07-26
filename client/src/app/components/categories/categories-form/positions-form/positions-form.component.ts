import { Component, OnInit, Input } from '@angular/core';
import { Position } from '../../../../shared/models/position';
import { PositionsService } from '../../../../shared/services/positions.service';
import { MaterialService } from '../../../../shared/helpers/material.service';
@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css'],
})
export class PositionsFormComponent implements OnInit {
  @Input('categoryId') categoryId: string;
  positions: Position[] = [];
  loading: boolean = false;
  constructor(private positionsService: PositionsService) {}

  ngOnInit(): void {
    this.getPositions();
  }

  private getPositions() {
    this.loading = true;
    this.positionsService.fetchPositions(this.categoryId).subscribe(
      (positions) => {
        this.positions = positions;
        this.loading = false;
      },
      (error) => MaterialService.handleError(error.error.message)
    );
  }
}
