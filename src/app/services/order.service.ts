import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { UserService } from './user.service';
import { catchError, throwError } from 'rxjs';
import { UserProductsService } from './user-products.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient, private userService: UserService, private userProductService: UserProductsService) { }

  makeOrder(order: Order): void {
      this.userService.user$.subscribe(user => {
        const headers = {
          'Authorization': `Bearer ${user?.token}`
        };
        console.log(order);
  
        this.httpClient.post<Order>('http://127.0.0.1:8000/api/orders', order, { headers })
          .pipe(
            catchError((error) => {
              console.error('Došlo je do greške prilikom dodavanja ordera:', error);
              return throwError(error);
            })
          )
          .subscribe(() => {
            this.userProductService.loadUserProducts();
          });
      });
  }


}
