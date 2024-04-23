import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../../../services/image.service';
import { Product } from '../../../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit, OnDestroy {
  selectedImage!: Product;
  isFullVersion: boolean = false;
  isFreeVersion: boolean = true;
  isOwner: boolean = false;
  subscription!: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private imageService: ImageService) {}

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.subscription = this.imageService.images$.subscribe(images => {
      const image = images.find(i => i.product_id === id);
      if (image) {
        this.selectedImage = image;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setVersion(version: string): void {
    if (version === 'full') {
      if (!this.isOwner) {
        alert("You do not own the full version! You must buy it first in order to access it.");
        return;
      }
      this.isFullVersion = true;
      this.isFreeVersion = false;
    } else if (version === 'free') {
      this.isFullVersion = false;
      this.isFreeVersion = true;
    }
  }

  buyVersion(): void {
    // Implement purchase logic here
  }
}
