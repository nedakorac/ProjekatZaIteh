import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit, OnDestroy {
  @Input() selectedVideo!: Product;
  isFullVersion: boolean = false;
  isFreeVersion: boolean = true;
  isOwner: boolean = true;
  subscription!: Subscription;
  displayedVideo!: string;


  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService) { }

  ngOnInit(): void {
    if (!this.selectedVideo) {
      const id = +this.activatedRoute.snapshot.paramMap.get('id')!;
      this.subscription = this.videoService.videos$.subscribe(videos => {
        const video = videos.find(v => v.product_id === id);
        if (video) {
          this.selectedVideo = video;
          this.displayedVideo = video.free_version;
        }
      });
    }
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
      this.displayedVideo = this.selectedVideo.full_product;
    } else if (version === 'free') {
      this.isFullVersion = false;
      this.isFreeVersion = true;
      this.displayedVideo = this.selectedVideo.free_version;
    }
  }

  buyVersion(): void {
    // Implement purchase logic here
  }
}
