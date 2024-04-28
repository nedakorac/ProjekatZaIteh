import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { VideoService } from '../../services/video.service';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  constructor(private productService: ProductService, 
              private router: Router,
              private imageService: ImageService,
              private videoService: VideoService,
              private pdfService: PdfService) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const newProduct = new Product(
      +form.value.product_id,
      form.value.name,
      +form.value.price,
      form.value.type.toLowerCase(),
      form.value.category,
      form.value.author,
      0,
      form.value.full_product,
      form.value.free_version,
      form.value.imageUrl
    );
    this.productService.createNewProduct(newProduct);
    form.reset(); 
    this.router.navigate(['/']); 
  }
}
