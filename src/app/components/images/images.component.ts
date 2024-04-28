import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit, OnDestroy {
  images: Product[] = [];
  private subscription!: Subscription;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.subscription = this.imageService.images$.subscribe({
      next: (imagesIzBaze) => {
        this.images = imagesIzBaze;
      },
      error: (error) => console.error('Failed to load images', error)
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  
}
