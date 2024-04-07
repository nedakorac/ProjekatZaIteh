import { Injectable } from '@angular/core';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  images = [
    new Image(1, 'Sunset', 20.0, 'Beautiful sunset at the beach.', 'Nature', 'Author A', 50, 'assets/pozadina.jpg', 'assets/pozadina.jpg'),
    new Image(2, 'Mountain', 30.0, 'Snowy mountain peak.', 'Adventure', 'Author B', 75, 'assets/pozadina.jpg', 'assets/pozadina.jpg'),
    new Image(3, 'Forest', 15.0, 'Green forest in spring.', 'Nature', 'Author C', 20, 'assets/pozadina.jpg', 'assets/pozadina.jpg'),
    new Image(4, 'Cityscape', 25.0, 'City skyline at night.', 'Urban', 'Author D', 100, 'assets/pozadina.jpg', 'assets/pozadina.jpg'),
    new Image(5, 'Desert', 10.0, 'Expansive desert dunes.', 'Travel', 'Author E', 30, 'assets/pozadina.jpg', 'assets/pozadina.jpg')
];

  constructor() { }
}
