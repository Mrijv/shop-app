import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, combineLatest, EMPTY, Observable, Subject, tap } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  pageTitle: string = 'Product Detail'; 

  onBack(): void {
    this.router.navigate(["/products"]);
  }

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
 
  //@Input()
  selectedProduct$: Observable<IProduct> = this.productService.productSelectedAction$
  .pipe(
    catchError(err=>{
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {    
  }

   //product$: Observable<IProduct>;
//it was in constructor:
   // this.product$ = this.productService.productSelectedAction
    // .pipe(
    //   tap(item=>console.log(item)),
    //   catchError(err => {
    //     console.log(err);
    //     this.errorMessageSubject.next(err);
    //     return EMPTY;
    //   })
    // );

   // ngOnInit(): void {
  //   const id = Number(this.route.snapshot.paramMap.get("id"));
  //   this.pageTitle = `Product Detail: ${id}`;
  // }
}
