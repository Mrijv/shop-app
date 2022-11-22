import { Injectable } from '@angular/core';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): IProduct[]{
    return [
      {
        "productId": 1,
        "productName": "Dynafit",
        "productCode": "GDN-0011",
        "releaseDate": "March 19, 2021",
        "description": "DYNAFIT-Trail-Running-Shoe-Ultra-100-W-terrain.",
        "price": 19.95,
        "starRating": 3.2,
        "imageUrl": "assets/images/trailShoes.jpg"
      },
      {
        "productId": 1,
        "productName": "Dynafit",
        "productCode": "GDN-0011",
        "releaseDate": "March 19, 2021",
        "description": "DYNAFIT-Trail-Running-Shoe-Ultra-100-W-terrain.",
        "price": 19.95,
        "starRating": 3.2,
        "imageUrl": "assets/images/trailShoes.jpg"
      }
    ];
  }
}
