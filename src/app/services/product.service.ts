import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { catchError, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  createNewProduct(product: Product){
    this.userService.user$.pipe(
      switchMap(user => {
        const headers = { 'Authorization': `Bearer ${user?.token}` };
        console.log(user?.token);
        console.log(product);
        return this.httpClient.post<Product>('http://127.0.0.1:8000/api/products', product, { headers });
      }),
      catchError((error) => {
        console.error('Error during product addition:', error);
        return throwError(error);
      })
    ).subscribe({
      next: () => {
        console.log('Product successfully added!');
        // Dodatna logika
      },
      error: (error) => console.error('Error while adding product:', error)
    });
  }
}
