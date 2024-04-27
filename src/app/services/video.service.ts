import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {


  private videosSubject = new BehaviorSubject<Product[]>([]);
  public videos$ = this.videosSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  loadVideosByType(): Observable<Product[]> {
    let type = "video";
    return this.httpClient.get<{ data: Product[] }>(`http://127.0.0.1:8000/api/products/${type}`).pipe(
      map(response => response.data.map(video => new Product(
        video.product_id,
        video.name,
        video.price,
        video.type,
        video.category,
        video.author,
        video.num_of_downloads,
        `http://127.0.0.1:8000/${video.full_product}`,
        `http://127.0.0.1:8000/${video.free_version}`,
        `http://127.0.0.1:8000/${video.imageUrl}`
      ))),
      tap(videos => {
        this.videosSubject.next(videos);
      }),
      catchError(error => {
        console.error('Error loading videos:', error);
        return throwError(() => new Error('Error loading videos'));
      })
    );
  }
  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<{ data: Product }>(`http://127.0.0.1:8000/api/products/${id}`).pipe(
      map(response => {
        const video = response.data;
        return new Product(
          video.product_id,
          video.name,
          video.price,
          video.type,
          video.category,
          video.author,
          video.num_of_downloads,
          `http://127.0.0.1:8000/${video.full_product}`,
          `http://127.0.0.1:8000/${video.free_version}`,
          `http://127.0.0.1:8000/${video.imageUrl}`
        );
      }),
      catchError(error => {
        console.error('Error loading product:', error);
        return throwError(() => new Error('Error loading product'));
      })
    );
  }
  filterVideos(filteredProducts: Product[]) {
    this.videosSubject.next(filteredProducts);
  }

}
