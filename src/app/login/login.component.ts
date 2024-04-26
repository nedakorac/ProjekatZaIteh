import { Component } from '@angular/core';
import { first } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router) {}

  login(loginEmail: HTMLInputElement, loginPassword: HTMLInputElement) {
    const email = loginEmail.value;
    const password = loginPassword.value;
    
    let succesfullyLoggedIn = this.userService.login(email, password);

    if(succesfullyLoggedIn){
      alert("Uspesno ste se ulogovali!");
      this.router.navigate(['/images']);  
    }
    else{
      alert("Neuspesno logovanje");
    }
  }


  register(firstName: HTMLInputElement, lastName: HTMLInputElement, registerEmail: HTMLInputElement, registerPassword: HTMLInputElement) {
    let fullName = firstName.value + " " + lastName.value;
    let user = new User(0, fullName, registerEmail.value, registerPassword.value, undefined )
   
    this.userService.register(user);
    
  }
}
