import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { ImageService } from '../services/image.service';
import { PdfService } from '../services/pdf.service';
import { VideoService } from '../services/video.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent implements OnInit{

  @ViewChild('category') categoryElement!: ElementRef;
  @ViewChild('price') priceElement!: ElementRef;
  @ViewChild('author') authorElement!: ElementRef;

  products: Product[] = [];
  filteredProducts: Product[] = [];
  private subscription!: Subscription;


  public selectedPage: string = "";

  constructor(private router: Router,
              private imageService: ImageService, 
              private videoService: VideoService, 
              private pdfService: PdfService) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.selectedPage = event.url.slice(1);
      if(this.selectedPage == "images"){
        this.subscription = this.imageService.loadImagesByType('image').subscribe({
          next: (images) => {
            this.products = images;
            this.filteredProducts = images;
          },
          error: (error) => console.error('Failed to load images', error) 
        });
      }
      if(this.selectedPage == "videos"){
        this.subscription = this.videoService.loadVideosByType().subscribe({
          next: (videos) => {
            this.products = videos;
            this.filteredProducts = videos;
          },
          error: (error) => console.error('Failed to load videos', error) 
        });
      }
      if(this.selectedPage == "pdfs"){
        this.subscription = this.pdfService.loadPdfsByType().subscribe({
          next: (pdfs) => {
            this.products = pdfs;
            this.filteredProducts = pdfs;
          },
          error: (error) => console.error('Failed to load pdfs', error) 
        });
      }
  
    });
    
  }

  filterProducts() {
    const category = this.categoryElement.nativeElement.value;
    const price = this.priceElement.nativeElement.value;
    const author = this.authorElement.nativeElement.value;


    this.filteredProducts = this.products.filter(product => {
      return (category === '' || category === 'none' || product.category === category) &&
             (price === '' || price === 'none' || this.checkPriceRange(product.price, price)) &&
             (author === '' || author === 'none' || product.author.toLowerCase().includes(author.toLowerCase()));
    });
    if(this.selectedPage == "images"){
      this.imageService.filterImages(this.filteredProducts);
    }    
    if(this.selectedPage == "videos"){
      this.videoService.filterVideos(this.filteredProducts);
    }    
    if(this.selectedPage == "pdfs"){
      this.pdfService.filterPdfs(this.filteredProducts);
    }    
  }
  checkPriceRange(productPrice: number, selectedPriceRange: string): boolean {
    switch (selectedPriceRange) {
      case 'Free':
        return productPrice === 0;
      case '<0-20':
        return productPrice >= 0 && productPrice <= 19.99;
      case '20-30':
        return productPrice >= 20 && productPrice <= 30;
      case '30+':
        return productPrice > 30;
      default:
        return false;
    }
    
  }

  selectPrice(price: string) {
    console.log("Selected price:", price);
  }
  clearFilters() {
    this.categoryElement.nativeElement.value = 'none';
    this.priceElement.nativeElement.value = 'none';
    this.authorElement.nativeElement.value = '';
    this.filteredProducts = [...this.products]; 
    
    if(this.selectedPage == "images"){
      this.imageService.filterImages(this.products);
    }    
    if(this.selectedPage == "videos"){
      this.videoService.filterVideos(this.products);
    }    
    if(this.selectedPage == "pdfs"){
      this.pdfService.filterPdfs(this.products);
    }    
  }

}
