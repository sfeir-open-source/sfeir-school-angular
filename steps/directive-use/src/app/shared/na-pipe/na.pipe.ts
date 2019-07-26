import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'na'
})
export class NaPipe implements PipeTransform {
  /**
   * Function to transform input value
   *
   * @param value
   * @param args
   *
   * @returns {any|string}
   */
  transform(value: any, args?: any): any {
    return value || 'N/A';
  }
}
