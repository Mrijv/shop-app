import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
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

  onRatingClicked(newRating: IProduct): void{
    //set rationg to the corresponding IProduct - it can't be setter and getter, more like observable?
    console.log("Rating click worked!");
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
