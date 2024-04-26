import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedInUser = new BehaviorSubject<User>(new User(0, "", "",""));
  public user$ = this.loggedInUser.asObservable();

  constructor(private httpClient: HttpClient) { }

  register(user: User): void {
    let userData = { name: user.name, email: user.email, password: user.password };

      this.httpClient.post<{user: User, token: string}>('http://127.0.0.1:8000/api/register', userData).subscribe(user =>{
      let newUser = new User(user.user.id, user.user.name, user.user.email, undefined, user.token);
      this.loggedInUser.next(newUser);
      console.log(newUser);
    });
  }

  login(email: string, password: string): Observable<boolean> {
    const body = { email, password };

    return this.httpClient.post<{user: User, token: string}>('http://127.0.0.1:8000/api/login', body)
      .pipe(
        map(user => {
          let newUser = new User(user.user.id, user.user.name, user.user.email, undefined, user.token);
          this.loggedInUser.next(newUser);
          return true;
        }), 
        catchError(error => of(false)) 
      );
  }

}
