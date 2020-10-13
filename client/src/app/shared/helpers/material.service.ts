import { ElementRef } from '@angular/core';

declare var M;

export interface ModalInterface {
  open?(): void;
  close?(): void;
  destroy?(): void;
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
}
