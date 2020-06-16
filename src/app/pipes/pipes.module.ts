import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrarPipe } from './filtrar.pipe';
import { ImagenPipe } from './imagen.pipe';



@NgModule({
  declarations: [FiltrarPipe, ImagenPipe],
  imports: [
    CommonModule
  ],
  exports:[
    FiltrarPipe,
    ImagenPipe
  ]
})
export class PipesModule { }
