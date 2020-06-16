import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = environment.url;

const token = localStorage.getItem('token');

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(path:string): any {
    return `${url}/clients/image/${path}?token=${token}`;
  }

}
