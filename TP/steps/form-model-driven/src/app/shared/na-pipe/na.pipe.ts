import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'na'
})
export class NaPipe implements PipeTransform {
  transform(value: string): string {
    return value || 'N/A';
  }
}
