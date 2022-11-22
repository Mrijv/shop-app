import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { IProduct } from '../products/product';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  cropWidth: number = 75;
  @Input() rating!: IProduct;
  @Output() ratingClicked: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  ngOnChanges(): void {
    this.cropWidth = this.rating.starRating * 75 / 5
  }

  onClick(): void{
    this.ratingClicked.emit(this.rating);
  }
}
