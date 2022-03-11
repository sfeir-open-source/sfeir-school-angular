import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'na',
})
export class NaPipe implements PipeTransform {
  transform(value: string, customNa: string = 'N/A'): unknown {
    return value || customNa;
  }
}
