import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list-alt',
  templateUrl: './product-list-alt.component.html',
  styleUrls: ['./product-list-alt.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent   {
  pageTitle = "Products";

  constructor(private productService: ProductService){}

  products$ = this.productService.products4$;
  selectedProduct$: Observable<IProduct> = this.productService.productSelectedAction$;

  onSelected(product: IProduct): void{
    this.productService.selectedProductChanged(product);
  }
}
