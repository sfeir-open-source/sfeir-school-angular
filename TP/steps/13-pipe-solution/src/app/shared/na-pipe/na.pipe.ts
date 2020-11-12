import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'na'
})
export class NaPipe implements PipeTransform {
  transform(value: string, byDefault: string = 'N/A'): string {
    return value || byDefault;
  }
}
