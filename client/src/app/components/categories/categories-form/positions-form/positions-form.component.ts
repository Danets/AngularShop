import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  form: FormGroup;
  positions: Position[] = [];
  loading: boolean = false;
  constructor(private positionsService: PositionsService) {}

  ngOnInit(): void {
    this.getPositions();
    this.modal = MaterialService.modalInit(this.modalRef);
    this.initForm();
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

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }
  onSelectPosition(position: Position) {
    this.form.patchValue({
      name: position.name,
      cost: position.cost,
    });
    MaterialService.reInitTextField();
    this.modal.open();
  }
  onAddPosition() {
    this.modal.open();
  }
  onDeletePosition(position: Position, event: Event) {
    event.stopPropagation();
    this.positionsService.deletePosition(position._id).subscribe((res) => {
      MaterialService.handleError('Position was deleted');
      this.getPositions();
    });
  }
  onCancel() {
    this.modal.close();
    this.form.reset();
  }
  onSubmit() {
    this.form.disable();
    const newPosition = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId,
    };
    this.positionsService.addPosition(newPosition).subscribe(
      (position) => {
        this.positions.push(position);
        MaterialService.handleError('Position was created');
      },
      (error) => MaterialService.handleError(error.error.message),
      () => {
        this.modal.close();
        this.form.reset();
        this.form.enable();
      }
    );
    // this.getPositions();
  }
}
