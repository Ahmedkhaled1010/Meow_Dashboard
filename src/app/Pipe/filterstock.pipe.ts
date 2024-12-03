import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterstock',
  standalone: true
})
export class FilterstockPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
