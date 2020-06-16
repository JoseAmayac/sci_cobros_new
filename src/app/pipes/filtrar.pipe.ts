import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrar'
})
export class FiltrarPipe implements PipeTransform {

  transform(arreglo: any[], texto:string, columna:string): any {
    if (texto === "") {
      return arreglo;
    }else{
      return arreglo.filter( item =>{
        return item[columna].toLowerCase().includes(texto.toLocaleLowerCase()) ||
               item['dni'].toLowerCase().includes(texto.toLocaleLowerCase())
      })
    }
  }

}
