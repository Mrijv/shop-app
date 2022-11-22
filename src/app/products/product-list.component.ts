import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = "Product List";
  products: any[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }
  
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
