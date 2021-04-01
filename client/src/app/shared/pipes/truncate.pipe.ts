import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, length: number = 5, kindOfSimbol: string = "..."): string {
    let changedString = value.slice(0, length);

    if (value.length > length) {
      changedString += kindOfSimbol;
    }

    return changedString;
  }

}
