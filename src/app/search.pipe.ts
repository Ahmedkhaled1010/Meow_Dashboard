import { Pipe, PipeTransform } from '@angular/core';
import { product } from './interface';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(allProduct: product[], userWord: string): product[] {
    return allProduct.filter((onProd)=>onProd.name.toLowerCase().includes(userWord.toLowerCase()));
  }

}
