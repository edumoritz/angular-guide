import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { RecipesModule } from './recipes/recipes.module';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesModule,
    ShoppingListModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
