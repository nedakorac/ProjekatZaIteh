import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserProductsService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products = this.productsSubject.asObservable();

  constructor(private http: HttpClient, private userService: UserService) { }

  loadUserProducts() {
    let userId;
    this.userService.user$.subscribe(data => userId = data.id)
    this.http.get<{ data: Product[] }>(`http://127.0.0.1:8000/api/user/${userId}/orders`).pipe(
      map(response => response.data.map(product => new Product(
        product.product_id,  
        product.name,
        product.price,
        product.type,
        product.category,
        product.author,
        product.num_of_downloads,
        `http://127.0.0.1:8000/${product.full_product}`,  
        `http://127.0.0.1:8000/${product.free_version}`,  
        `http://127.0.0.1:8000/${product.imageUrl}`      
      ))),
      tap(products => {
        this.productsSubject.next(products);
      }),
      catchError(error => {
        console.error('Error loading images:', error);
        return throwError(() => new Error('Error loading images'));
      })
    );
  }
}
