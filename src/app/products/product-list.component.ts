import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProductRating } from '../model/productRating';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  private _listFilter: string = '';
  get listFilter(){
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }
  pageTitle: string = "Product List";
  products: IProduct[] = [];
  showImage: boolean = false;
  toggleImageTextBtn: string = "Show Image";
  filteredProducts: IProduct[]=[];
  errorMessage: string = '';
  sub!: Subscription;

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => 
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
    if(this.showImage==true)
    {
      this.toggleImageTextBtn = "Hide image";
    }
    else
    {
      this.toggleImageTextBtn = "Show Image";
    }
  }

  onRatingClicked(newRating: IProductRating): void{
    //set rationg to the corresponding IProduct - it can't be setter and getter, more like observable?
    console.log(`${newRating.rating}`);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
