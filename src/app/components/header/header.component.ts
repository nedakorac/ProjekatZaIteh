import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  isAuthenticated = false;


  onLogout() {
    throw new Error('Method not implemented.');
    }
}
