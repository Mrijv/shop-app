import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Observable, Subject, tap } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  pageTitle: string = 'Product Detail'; 

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    console.log("cokolwiek onInit");
    this.pageTitle = `Product Detail: ${id}`;
  }

  onBack(): void {
    this.router.navigate(["/products"]);
  }

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  product$: Observable<IProduct>;
  selectedProduct$: Observable<IProduct> = this.productService.productSelectedAction;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { 
    console.log("cokolwiek constructor");
    
    this.product$ = this.productService.productSelectedAction
    .pipe(
      tap(item=>console.log(item)),
      catchError(err => {
        console.log(err);
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );
  }
}
