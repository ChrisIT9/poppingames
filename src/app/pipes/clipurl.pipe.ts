import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clipurl'
})
export class ClipurlPipe implements PipeTransform {

  transform(value: string) {
    let endIndex = value.indexOf("-preview");
    return value.substring(0, endIndex) + ".mp4";
  }

}
