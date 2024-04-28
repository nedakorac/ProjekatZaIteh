import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { Token } from '@angular/compiler';
import { UserProductsService } from './user-products.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedInUser = new BehaviorSubject<User | null>(null);
  public user$ = this.loggedInUser.asObservable();

  isAuthenticated = false;
  isAdmin = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  register(user: User): void {
    let userData = { name: user.name, email: user.email, password: user.password };

    this.httpClient.post<{ user: User; token: string }>('http://127.0.0.1:8000/api/register', userData).subscribe({
      next: (response) => {
        let newUser = new User(response.user.id, response.user.name, response.user.email, undefined, response.token);
        this.loggedInUser.next(newUser);
        this.isAuthenticated = true;
        this.setUserData(newUser);
        alert('Uspešno registrovanje!');
      },
      error: (error) => {
        // Prikazujemo poruku o grešci sa servera ako je dostupna, inače generičku grešku
        const errorMessage = error.error.message || 'Error while trying to regiter. Check your data!.';
        alert(`Error: ${errorMessage}`);
      }
    });
  }

  login(email: string, password: string): void {
    this.httpClient.post<{ user: User; token: string }>('http://127.0.0.1:8000/api/login', { email, password }).subscribe({
      next: (response) => {
        let newUser = new User(response.user.id, response.user.name, response.user.email, undefined, response.token);
        this.isAuthenticated = true;
        console.log('Uspešno prijavljivanje!', newUser);
        alert(`Succesfully LoggedIn`);
        this.setUserData(newUser);
        this.router.navigate(['/images']);  

      },
      error: (error) => {
        const errorMessage = error.error.message || 'Neispravni podaci za prijavu';
        alert(`Error: ${errorMessage}`);
      }
    });
  }

  logout(){
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.loggedInUser.next(null);
    localStorage.removeItem('userData');
  }

  setUserData(user: User){
    localStorage.setItem('userData', JSON.stringify(user));
    this.loggedInUser.next(user);
    this.isAuthenticated = true;
    if(user.email =="admin@gmail.com")
      this.isAdmin = true;
  }
}
