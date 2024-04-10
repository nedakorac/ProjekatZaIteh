import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../../services/video.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrl: './video-details.component.css'
})
export class VideoDetailsComponent {
  selectedVideo!: Product;
  isFullVersion: boolean = false;
  isFreeVersion: boolean = true; 

  isOwner: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService){

  }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.selectedVideo = this.videoService.videos.at(id)!;
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
