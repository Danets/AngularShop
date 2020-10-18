import { ElementRef } from '@angular/core';

declare var M;

export interface ModalInterface {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

export interface DatePickerInterface extends ModalInterface {
  date?: Date;
}

export class MaterialService {
  static handleError(error: string) {
    return M.toast({ html: error });
  }

  static actionBtn(elem: ElementRef) {
    M.FloatingActionButton.init(elem.nativeElement);
  }

  static reInitTextField() {
    M.updateTextFields();
  }

  static modalInit(elem: ElementRef): ModalInterface {
    return M.Modal.init(elem.nativeElement);
  }

  static initTooltip(elem: ElementRef): ModalInterface {
    return M.Tooltip.init(elem.nativeElement);
  }

  static initDatePicker(
    elem: ElementRef,
    onClose: () => void
  ): DatePickerInterface {
    return M.Datepicker.init(elem.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose,
    });
  }
}
