import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ProductsPage } from './products.page';
import { PipesModule } from '../../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    PipesModule
  ],
  declarations: [ProductsPage]
})
export class ProductsPageModule {}
