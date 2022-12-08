import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { ProductDetailComponent } from './product-detail.component';
import { SharedModule } from '../shared/shared.module';
import { ProductListAltComponent } from './products-alt/product-list-alt.component';
import { ProductShellComponent } from './products-alt/product-shell.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ConvertToSpacesPipe,
    ProductDetailComponent,
    ProductListAltComponent,
    ProductShellComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ProductModule { }
