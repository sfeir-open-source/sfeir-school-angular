import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'na',
})
export class Na implements PipeTransform {
  transform(value: string | undefined | null, customMessage = 'N/A') {
    return value || customMessage;
  }
}
