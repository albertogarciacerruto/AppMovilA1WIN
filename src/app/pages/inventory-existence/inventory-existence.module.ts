import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InventoryExistencePage } from './inventory-existence.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryExistencePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InventoryExistencePage]
})
export class InventoryExistencePageModule {}
