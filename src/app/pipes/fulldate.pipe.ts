import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fulldate'
})
export class FulldatePipe implements PipeTransform {
  months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

  transform(value: string | undefined) {
    if (!value) return undefined;
    const [ year, month, day ] = value.split("-");
    return `${day} ${this.months[Number(month) - 1]} ${year}`;
  }

}
