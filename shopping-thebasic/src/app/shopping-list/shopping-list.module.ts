import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

@NgModule({
  declarations: [ShoppingEditComponent, ShoppingListComponent],
  imports: [
    FormsModule,
    RouterModule.forChild([
      { path: 'shopping-list', component: ShoppingListComponent }
    ]),
    SharedModule,
  ]
})
export class ShoppingListModule {}
