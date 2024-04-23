export class Product {
  constructor(
      public product_id: number,
      public name: string,
      public price: number,
      public type: string,
      public category: string,
      public author: string,
      public num_of_downloads: number,
      public full_product: string,
      public free_version: string,
      public imageUrl: string
  ) {}
}
