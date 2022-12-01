import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, combineLatest, map, Observable, tap, throwError } from 'rxjs';
import { CategoryService } from '../Category/category.service';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl: string = 'assets/api/products/products.json';
  constructor(private http: HttpClient, private categoryService: CategoryService) { }
  
  getProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.productUrl)
    .pipe(
      catchError(this.handleError)
    );
  }

  products3$ = this.http.get<IProduct[]>(this.productUrl)
  .pipe(
    catchError(this.handleError)
  );

  products4$ = combineLatest([
    this.products3$,
    this.categoryService.categories$
  ]).pipe(
    map(([products, categories]) =>
    products.map(product => ({
      ...product,
      price: product.price ? product.price * 1.5 : 0,
      category: categories.find(c => product.categoryId === c.id)?.name,
      searchKey: [product.productName]
    } as IProduct))
  ),
  );

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
