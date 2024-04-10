import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../../../services/image.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrl: './image-details.component.css'
})
export class ImageDetailsComponent implements OnInit {

  selectedImage!: Product;
  isFullVersion: boolean = false;
  isFreeVersion: boolean = true; 

  isOwner: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private imageService: ImageService){

  }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.selectedImage = this.imageService.images.at(id)!;
  }

  setVersion(version: string): void {
    if (version === 'full') {
      if(!this.isOwner){
        alert("You do not own full version! You have to buy it first in order to access it.");
        return;
      }
      this.isFullVersion = true;
      this.isFreeVersion = false;
    } else if (version === 'free') {
      this.isFullVersion = false;
      this.isFreeVersion = true;
    }
  }

  buyVersion() {
    //ODRADI OVO
     }
 


}
