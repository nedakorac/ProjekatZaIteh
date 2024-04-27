import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {


  private imagesSubject = new BehaviorSubject<Product[]>([]);
  public images$ = this.imagesSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  loadImagesByType(type: string): Observable<Product[]> {
    return this.httpClient.get<{ data: Product[] }>(`http://127.0.0.1:8000/api/products/${type}`).pipe(
      map(response => response.data.map(image => new Product(
        image.product_id,  
        image.name,
        image.price,
        image.type,
        image.category,
        image.author,
        image.num_of_downloads,
        `http://127.0.0.1:8000/${image.full_product}`,  
        `http://127.0.0.1:8000/${image.free_version}`,  
        `http://127.0.0.1:8000/${image.imageUrl}`      
      ))),
      tap(images => {
        this.imagesSubject.next(images);
      }),
      catchError(error => {
        console.error('Error loading images:', error);
        return throwError(() => new Error('Error loading images'));
      })
    );
  }
  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<{data: Product}>(`http://127.0.0.1:8000/api/products/${id}`).pipe(
      map(response => {
        const image = response.data;
        return new Product(
          image.product_id,  
          image.name,
          image.price,
          image.type,
          image.category,
          image.author,
          image.num_of_downloads,
          `http://127.0.0.1:8000/${image.full_product}`,  
          `http://127.0.0.1:8000/${image.free_version}`,  
          `http://127.0.0.1:8000/${image.imageUrl}`
        );
      }),
      catchError(error => {
        console.error('Error loading product:', error);
        return throwError(() => new Error('Error loading product'));
      })
    );
  }
  filterImages(filteredProducts: Product[]) {
    console.log(filteredProducts);
    this.imagesSubject.next(filteredProducts);
  }


}
