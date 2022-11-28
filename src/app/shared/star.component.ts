import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { IProductRating } from '../model/productRating';
import { IProduct } from '../products/product';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  cropWidth: number = 75;
  @Input() starRating!: IProductRating;
  @Output() ratingClicked: EventEmitter<IProductRating> = new EventEmitter<IProductRating>();

  ngOnChanges(): void {
    this.cropWidth = this.starRating.rating * 75 / 5
  }

  onClick(): void{
    this.ratingClicked.emit(this.starRating);
  }
}
