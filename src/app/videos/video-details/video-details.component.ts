import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { Product } from '../../models/product';
import { Observable, Subscription, map } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserProductsService } from '../../services/user-products.service';
import { User } from '../../models/user';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

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
  loggedInUser?: User;
  creditCardInfo = false;


  @ViewChild('creditCardNumber') creditCardNumber!: ElementRef;



  constructor(private activatedRoute: ActivatedRoute, 
              private videoService: VideoService, 
              public userService: UserService,
              private productService: UserProductsService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      if (user)
        this.loggedInUser = user;
    })
    if (!this.selectedVideo) {
      const id = +this.activatedRoute.snapshot.paramMap.get('id')!;
      this.subscription = this.videoService.getProductById(id).subscribe({
        next: (data) => {
          let video = new Product(data.product_id, data.name, data.price, data.type, data.category, data.author, data.num_of_downloads, data.full_product, data.free_version, data.imageUrl);
          this.selectedVideo = video;
          this.displayedVideo = video.free_version;
        },
        error: (error) => console.error('Failed to load product', error)
      });
      
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setVersion(version: string): void {
    let pass = false;
    if (version === 'full') {

      if (this.selectedVideo.price == 0) {
        this.isFullVersion = true;
        this.isFreeVersion = false;
        this.displayedVideo = this.selectedVideo.full_product;
      }
      else {
        if (this.userService.isAuthenticated) {
          this.userService.user$.subscribe(user => {
            this.productService.products.subscribe(products => {
              products.forEach(product => {
                if (product.product_id === this.selectedVideo.product_id) {
                  this.isFullVersion = true;
                  this.isFreeVersion = false;
                  this.displayedVideo = this.selectedVideo.full_product;
                }
              });
            })
          })
        }
        else {
          alert("You have to own this product to show full version!");
        }
      }

    } else if (version === 'free') {
      this.isFullVersion = false;
      this.isFreeVersion = true;
      this.displayedVideo = this.selectedVideo.free_version;
    }
  }


  buyVersion(): void {
    this.creditCardInfo = true;
  }
  acceptPayment() {
    let creditCard = this.creditCardNumber.nativeElement.value;
    if (this.isValidCreditCardNumber(creditCard)) {
      if (this.loggedInUser?.id) {
        this.userAlreadyOwnsProduct().subscribe(ownsProduct => {
          if (ownsProduct) {
            alert("You already own this product!")
          } else {
            if (this.loggedInUser?.id) {
              let order = new Order(0, this.loggedInUser?.id, this.selectedVideo.product_id, this.getTodayDateFormatted())
              this.orderService.makeOrder(order);
              alert("Succesfully bought this product");
            }
          }
        });

      }
      else {
        alert("You have to be logged in!");
      }
    }
    else {
      alert("Credit card has to contain only numbers (16)");
    }
  }

  isValidCreditCardNumber(input: string) {
    const regex = /^\d{16}$/;
    return regex.test(input);
  }
  getTodayDateFormatted(): string {
    const today = new Date();  // Kreira novi Date objekat koji predstavlja trenutni datum i vreme
    const year = today.getFullYear();  // Dohvata trenutnu godinu
    const month = (today.getMonth() + 1).toString().padStart(2, '0');  // Dohvata mesec, dodaje 1 jer getMonth() vraća od 0-11
    const day = today.getDate().toString().padStart(2, '0');  // Dohvata dan meseca

    return `${year}-${month}-${day}`;  // Formira string u formatu YYYY-MM-DD
  }
  userAlreadyOwnsProduct(): Observable<boolean> {
    return this.productService.products.pipe(
            map(products => products.some(product => product.product_id === this.selectedVideo.product_id))
    );
  }
}
