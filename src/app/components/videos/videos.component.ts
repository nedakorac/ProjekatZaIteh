import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoService } from '../../services/video.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit, OnDestroy {
  videos: Product[] = [];
  private subscription!: Subscription;

  constructor(private videoService: VideoService) {}


  ngOnInit(): void {
    this.subscription = this.videoService.videos$.subscribe({
      next: (videos) => {
        this.videos = videos;
      },
      error: (error) => console.error('Failed to load videos', error)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
