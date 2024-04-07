import { Component } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent {

  filter1: boolean = false;
  filter2: boolean = false;
  filter3: boolean = false;

  constructor() { }

  selectPrice(price: string) {
    console.log("Selected price:", price);
    // Implement your logic here
  }

}
