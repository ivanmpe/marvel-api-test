import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CharacterDescriptionPage } from './character-description.page';

const routes: Routes = [
  {
    path: '',
    component: CharacterDescriptionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CharacterDescriptionPage]
})
export class CharacterDescriptionPageModule {}
