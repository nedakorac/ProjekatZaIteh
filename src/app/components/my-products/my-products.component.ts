import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs';
import { UserProductsService } from '../../services/user-products.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css'
})
export class MyProductsComponent {
  products: Product[] = [];
  private subscription!: Subscription;

  constructor(private userProductService: UserProductsService){}

  ngOnInit(): void {
    this.subscription = this.userProductService.products.subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => console.error('Failed to load products', error)
    });
  }

}
