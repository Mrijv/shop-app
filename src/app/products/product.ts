export interface IProduct {
    productId: number;
    productName: string;
    productCode: string;
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
    categoryId?: number;
    category?: string;
    quantityInStock?: number;
    searchKey?: string[];
    supplierIds?: number[];
  }