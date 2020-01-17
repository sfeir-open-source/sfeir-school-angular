import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'na'
})
export class NaPipe implements PipeTransform {
  /**
   * Function to transform input value
   *
   * @param value
   *
   * @returns {any|string}
   */
  transform(value: any): any {
    return value || 'N/A';
  }
}
