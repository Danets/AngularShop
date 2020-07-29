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
  positionId = null;

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
    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost,
    });
    MaterialService.reInitTextField();
    this.modal.open();
  }
  onAddPosition() {
    this.positionId = null;
    this.form.reset({
      name: null,
      cost: 1,
    });
    MaterialService.reInitTextField();
    this.modal.open();
  }
  onDeletePosition(position: Position, event: Event) {
    event.stopPropagation();
    const agree = window.confirm(`Do you wanna delete ${position.name}`);
    if (agree) {
      this.positionsService.deletePosition(position._id).subscribe((res) => {
        MaterialService.handleError('Position was deleted');
        // 1) Case with method SPLICE
        // const idx = this.positions.findIndex(
        //   (pos) => pos._id === position._id
        // );
        // this.positions.splice(idx, 1);

        // 2) Case with method FILTER
        this.positions = this.positions.filter(
          (pos) => pos._id !== position._id
        );
        // this.getPositions();
      });
    } else {
      return null;
    }
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

    // HERE IS METHOD FOR SUBSCRIBE
    const completed = () => {
      this.modal.close();
      this.form.reset();
      this.form.enable();
    };
    if (this.positionId) {
      newPosition['_id'] = this.positionId;
      this.positionsService.updatePosition(newPosition).subscribe(
        (position) => {
          // this.getPositions();
          const idx = this.positions.findIndex(
            (pos) => pos._id === position._id
          );
          this.positions[idx] = position;
          MaterialService.handleError('Position was updated');
        },
        (error) => MaterialService.handleError(error.error.message),
        completed
      );
    } else {
      this.positionsService.addPosition(newPosition).subscribe(
        (position) => {
          this.positions.push(position);
          MaterialService.handleError('Position was created');
        },
        (error) => MaterialService.handleError(error.error.message),
        completed
      );
    }
  }
}
