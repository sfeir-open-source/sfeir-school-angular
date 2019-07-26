import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myPipe'
})
export class MyPipePipe implements PipeTransform {
  public leeeeeek = 10;

  transform(value: number, mult = 10) {
    // DON'T DO THIS !!!!!
    // return value * leek;
    return value * mult;
  }
}
