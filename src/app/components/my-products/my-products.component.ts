import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs';
import { UserProductsService } from '../../services/user-products.service';
import { Router } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { VideoService } from '../../services/video.service';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css'
})
export class MyProductsComponent implements OnInit   {
  products: Product[] = [];
  private subscription!: Subscription;

  constructor(private userProductService: UserProductsService, 
              private router: Router, 
              private imageService: ImageService,
              private videoService: VideoService,
              private pdfService: PdfService){}

  ngOnInit(): void {
    this.subscription = this.userProductService.products.subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => console.error('Failed to load products', error)
    });
  }


  
}
