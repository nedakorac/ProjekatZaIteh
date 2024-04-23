import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user = { email: '', password: '' };

  login(email: string, password: string) {
    this.user.email = email;
    this.user.password = password;
    // Ovde dodajte logiku za prijavljivanje korisnika, na primer poziv API-ja
    console.log('User logged in', this.user);
  }
  register(firstName: string, lastName: string, email: string, password: string) {
  /*  this.user = {
      firstName,
      lastName,
      email,
      password,
    };
    // Ovde dodajte logiku za registraciju korisnika, na primer poziv API-ja
    console.log('User registered', this.user);*/
  }
}
