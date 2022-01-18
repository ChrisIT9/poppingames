import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'downscaledImage'
})
export class DownscaledImagePipe implements PipeTransform {

  transform(value: string | undefined) {
    if (!value) return undefined;
    return value.replace("media/", "media/crop/600/400/");
  }

}
