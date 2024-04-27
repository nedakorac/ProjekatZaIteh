import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, switchMap, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserProductsService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products = this.productsSubject.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {
    userService.user$.subscribe(data => {
      if (data) {
        console.log(data);
        this.loadUserProducts()
      }
      else{
        this.productsSubject.next([]);
      }
    }
    )
  }

  loadUserProducts() {
    this.userService.user$.pipe(
      switchMap(user => {
        if (!user) {
          // Možete baciti grešku ili vratiti prazan observable
          return throwError(() => new Error('No user logged in'));
        }
        return this.http.get<{ data: Product[] }>(`http://127.0.0.1:8000/api/user/${user.id}/orders`).pipe(
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
          )))
        );
      }),
      tap(products => {
        console.log(products);
        this.productsSubject.next(products);
      }),
      catchError(error => {
        console.error('Error loading images:', error);
        return throwError(() => new Error('Error loading images'));
      })
    ).subscribe(); 
  }
}
