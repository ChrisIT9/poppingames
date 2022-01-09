import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(value: number | undefined) {
    if (!value) return value;
    const valueToString = value.toString();
    const dotIndex = valueToString.indexOf(".");

    return parseFloat(valueToString.substring(0, dotIndex + 3));
  }

}
