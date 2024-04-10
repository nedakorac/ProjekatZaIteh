import { Injectable } from '@angular/core';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class PdfService {
  pdfs = [
    new Product(1, 'PDF', 20.0, 'Beautiful sunset at the beach.', 'Nature', 'Author A', 50, 'C:\Users\brati\Desktop\DigiStore\src\assets\random.pdf', 'C:\Users\brati\Desktop\DigiStore\src\assets\random.pdf', 'assets/pozadina.jpg'),
    new Product(2, 'PDF', 30.0, 'Snowy mountain peak.', 'Adventure', 'Author B', 75, 'assets/pozadina.jpg', 'assets/pozadina.jpg', 'assets/pozadina.jpg'),
    new Product(3, 'PDF', 15.0, 'Green forest in spring.', 'Nature', 'Author C', 20, 'assets/pozadina.jpg', 'assets/pozadina.jpg', 'assets/pozadina.jpg'),
    new Product(4, 'PDF', 25.0, 'City skyline at night.', 'Urban', 'Author D', 100, 'assets/pozadina.jpg', 'assets/pozadina.jpg', 'assets/pozadina.jpg'),
    new Product(5, 'PDF', 10.0, 'Expansive desert dunes.', 'Travel', 'Author E', 30, 'assets/pozadina.jpg', 'assets/pozadina.jpg', 'assets/pozadina.jpg')
];

}