import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fulldate'
})
export class FulldatePipe implements PipeTransform {
    months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

    transform(value: string | undefined) {
        if (!value) return undefined;
        const [ year, month, day ] = value.split("-");
        return `${day} ${this.months[Number(month) - 1]} ${year}`;
    }

}
