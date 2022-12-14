import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { ProductDetailGuard } from './products/product-detail.guard';
import { ProductListComponent } from './products/product-list.component';
import { ProductShellComponent } from './products/products-alt/product-shell.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'products', component: ProductListComponent, title: "ShoeSSite: Product List"},
    {
      path: 'products/:id',
      canActivate: [ProductDetailGuard],
      component: ProductDetailComponent
    },
    {path: 'product-list-alt', component: ProductShellComponent, title: "ShoeSSite: Product List Alt"},
    {path: 'welcome', component: WelcomeComponent},
    {path: '', component: WelcomeComponent, pathMatch: "full"},
    {path: "**", redirectTo: "welcome", pathMatch: "full"}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
