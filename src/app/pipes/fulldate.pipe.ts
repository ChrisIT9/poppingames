import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fulldate'
})
export class FulldatePipe implements PipeTransform {
    months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

    transform(value: string | undefined) {
        if (!value) return undefined;
        let [ year, month, day ] = value.split("-");
        if (day.startsWith("0")) day = day.replace("0", "");
        return `${day} ${this.months[Number(month) - 1]} ${year}`;
    }

}
