import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { NumbersPipe } from './numbers.pipe';

@NgModule({
  declarations: [FiltroPipe, NumbersPipe],
  exports: [ FiltroPipe, NumbersPipe ]
})
export class PipesModule { }
