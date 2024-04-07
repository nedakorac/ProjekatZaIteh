import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrl: './images.component.css'
})
export class ImagesComponent implements OnInit{

  images?: Image[] ;

  constructor(private imageService: ImageService){

  }

  ngOnInit(): void {
    this.images = this.imageService.images;
  }


}
