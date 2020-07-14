import { ElementRef } from '@angular/core';

declare var M;

export class MaterialService {
 static handleError(error: string) {
    return M.toast({html: error})
  }

  static actionBtn(elem: ElementRef) {
    M.FloatingActionButton.init(elem.nativeElement)
  }
}
