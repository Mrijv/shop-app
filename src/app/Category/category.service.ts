import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { ICategory } from "./category";

@Injectable({
    providedIn:'root'
})
export class CategoryService{
    private productCategoriesUrl = 'assets/api/categories/categories.json';

    categories$ = this.http.get<ICategory[]>(this.productCategoriesUrl)
        .pipe(
            catchError(this.handleError)
        );

    constructor(private http: HttpClient){}

    private handleError(err: HttpErrorResponse) : Observable<never> {
        let errorMessage: string;
        
        if(err.error instanceof ErrorEvent)
        {
            errorMessage = `An error occurred: ${err.error.message}`;
        }else{
            errorMessage = `Backend returned code ${err.status}: ${err.message}`;
        }

        console.error(err);
        return throwError(() => errorMessage);
    }
}