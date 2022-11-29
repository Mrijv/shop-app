import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl: string = 'assets/api/products/products.json';
  constructor(private http: HttpClient) { }
  
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
