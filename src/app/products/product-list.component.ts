import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, EMPTY, map, Observable, of, startWith, Subject, Subscription, tap } from 'rxjs';
import { CategoryService } from '../Category/category.service';
import { IProductRating } from '../model/productRating';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
//export class ProductListComponent implements OnInit, OnDestroy {
export class ProductListComponent {
  private categorySelectedSubject = new Subject<number>();
  categorySelectedAction$ = this.categorySelectedSubject.asObservable()
    .pipe(
      startWith(0)
    );

  private filteringProjectsSubject = new BehaviorSubject<string>("");
  filteringProductsAction$ = this.filteringProjectsSubject.asObservable();

  private _listFilter: string = '';
  get listFilter() {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    // this.filteredProducts = this.performFilter(value);
    this.filteringProjectsSubject.next(value);
  }

  pageTitle: string = "Product List";
  showImage: boolean = false;
  toggleImageTextBtn: string = "Show Image";
  errorMessage: string = ''; 

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  products4$ = combineLatest([
    this.productService.products4$,
    this.filteringProductsAction$
  ]).pipe(
    map(([productsToDisplay, filterStr]) => {
      filterStr = filterStr.toLocaleLowerCase()
      return productsToDisplay.filter(product => filterStr ? product.productName.toLocaleLowerCase().includes(filterStr) : true)
    }));


  categories$ = this.categoryService.categories$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  onSelectedCategory(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }

  onSelectedProduct(product: IProduct): void{
    this.productService.selectedProductChanged(product);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
    if (this.showImage == true) {
      this.toggleImageTextBtn = "Hide image";
    }
    else {
      this.toggleImageTextBtn = "Show Image";
    }
  }

  onRatingClicked(newRating: IProductRating): void {
    //set rationg to the corresponding IProduct - it can't be setter and getter, more like observable?
    console.log(`${newRating.rating}`);
  }
  
  //products: IProduct[] = [];
  //products2$: Observable<IProduct[]> | undefined;

  //filteredProducts: IProduct[] = [];
 //sub!: Subscription;

  // ngOnInit(): void {
  //   this.sub = this.productService.getProducts()
  //     .subscribe({
  //       next: products => {
  //         this.products = products;
  //         this.filteredProducts = this.products;
  //       },
  //       error: err => this.errorMessage = err
  //     });

  //   this.products2$ = this.productService.getProducts()
  //     .pipe(
  //       tap<IProduct[]>(productss => this.filteredProducts = productss),
  //       catchError(err => {
  //         this.errorMessage = err;
  //         return EMPTY;
  //       })
  //     );
  // }

  products5$ = combineLatest([
    this.products4$,
    this.categorySelectedAction$
  ]).pipe(
    map(([anotherProducts, categoryId]) =>
      anotherProducts.filter(product => categoryId ? product.categoryId === categoryId : true)
    ),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  // performFilter(filterBy: string): IProduct[] {
  //   filterBy = filterBy.toLocaleLowerCase();

  //   return this.products.filter((product: IProduct) =>
  //     product.productName.toLocaleLowerCase().includes(filterBy));
  // }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }
}
