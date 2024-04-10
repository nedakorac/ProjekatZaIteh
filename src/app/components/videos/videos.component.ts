import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent {
  videos?: Product[] ;

  constructor(private videoService: VideoService){

  }

  ngOnInit(): void {
    this.videos = this.videoService.videos;
  }
}
