import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numbers'
})
export class NumbersPipe implements PipeTransform {

  transform(arreglo: any, texto: string, columna: string): any {
    if( texto === ''){
      return arreglo;
    }

    return arreglo.filter( item => {
      return item[columna].toString().toLowerCase().includes( texto );
    });
  }

}