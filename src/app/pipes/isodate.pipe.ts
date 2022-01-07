import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isodate'
})
export class IsodatePipe implements PipeTransform {

    transform(value: string | undefined) {
        if (!value) return undefined;
        const [ date, time ] = value.split("T");
        const [ year, month, day ] = date.split("-");

        return `${day}/${month}/${year} alle ${time.substring(0, time.length - 5)} UTC`;
    }

}
