import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{


  isAuthenticated!: boolean;

  constructor(private userServicie: UserService){}

  ngOnInit(): void {
    this.userServicie.user$.subscribe(user =>{
      if(user.id == 0){
        this.isAuthenticated = false;
      }
      else{
        this.isAuthenticated = true;
      }
    })
  }

  onLogout() {
    throw new Error('Method not implemented.');
    }
}
