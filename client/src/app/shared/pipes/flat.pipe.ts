import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flat',
  pure: false,
})
/*It is IMPURE PIPE*/
export class FlatPipe implements PipeTransform {
  transform(values: any[], step: number): any[] {
    // const flattenedArray = Array.prototype.concat.apply([], array);
    // const flattenedArray = values.flat(Infinity);

    const flattenedArray = [];

    values.forEach(elem => {
      if (Array.isArray(elem)) {
        flattenedArray.push(...elem);
      } else {
        flattenedArray.push(elem);
      }
    });

    return flattenedArray;

    // return step > 0
    //   ? values.reduce(
    //       (acc, val) =>
    //         acc.concat(
    //           Array.isArray(val) ? this.transform(values, step - 1) : val
    //         ),
    //       []
    //     )
    //   : values.slice();
  }
}
