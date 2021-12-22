import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string | undefined) {
    if (!value) return undefined;
    const [ year, month, day ] = value.split("-");
    return `${day}/${month}/${year}`;
  }

}
