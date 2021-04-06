import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flat',
  pure: false,
})
/*It is IMPURE PIPE*/
export class FlatPipe implements PipeTransform {
  transform(values: any[]) {
    // OLD WAY FOR 2-DIMENSIONAL ARRAY
    // const flattenedArray = Array.prototype.concat.apply([], array);
    // const flattenedArray = [].concat.apply([], array);

    // NEW WAY FOR 2-DIMENSIONAL ARRAY
    // const flattenedArray = values.flat(2);
    
    // const flattenedArray = values.flat(Infinity);

    const flatten = (arr) => arr.reduce((flat, next) => flat.concat(Array.isArray(next) ? flatten(next) : next), []);

    const flattenedArray = flatten(values);

    return flattenedArray;

  }
}
