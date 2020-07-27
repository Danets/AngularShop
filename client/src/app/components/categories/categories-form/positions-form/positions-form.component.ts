import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { Position } from '../../../../shared/models/position';
import { PositionsService } from '../../../../shared/services/positions.service';
import {
  MaterialService,
  ModalInterface,
} from '../../../../shared/helpers/material.service';
@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css'],
})
export class PositionsFormComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId: string;
  // default {static: false} -> ngAfterViewInit
  @ViewChild('modal', { static: true }) modalRef: ElementRef;
  modal: ModalInterface;
  positions: Position[] = [];
  loading: boolean = false;
  constructor(private positionsService: PositionsService) {}

  ngOnInit(): void {
    this.getPositions();
    this.modal = MaterialService.modalInit(this.modalRef);
  }

  ngAfterViewInit(): void {
    // this.modal = MaterialService.modalInit(this.modalRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
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
  onSelectPosition(position: Position) {
    this.modal.open();
  }
  onAddPosition() {
    this.modal.open();
  }
  onCancel() {
    this.modal.close();
  }
}
