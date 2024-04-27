import { AfterViewChecked, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators'; // Ispravka za import 'filter'
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Ispravka na 'styleUrls'
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked {
  sideMenuActive = true;

  constructor(private router: Router, private renderer: Renderer2, private userService: UserService) {}

  ngOnInit() {
    let user = this.loadUser();
    if(user != null){
      this.userService.setUserData(user);
    }
    this.router.events.pipe(
      
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.sideMenuActive = event.url !== '/';
      if(!this.sideMenuActive){
        this.renderer.addClass(document.body, 'no-scroll');
      }
      else{
        this.renderer.addClass(document.body, 'scroll');
      }
    });
    
  }
  ngAfterViewChecked() {
    // Ako je sideMenuActive false, dodajemo klasu na body da onemogući skrol
    if (this.sideMenuActive) {
      this.renderer.removeClass(document.body, 'no-scroll');
    } else {
      this.renderer.addClass(document.body, 'no-scroll');
    }
  }
  ngOnDestroy() {
    // Kada se komponenta uništi, omogući skrolovanje
    this.renderer.removeClass(document.body, 'no-scroll');
  }
  set sideMenu(state: boolean) {
    if (state) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    } else {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }
  loadUser(): User | null {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userJson = JSON.parse(userData);
      return new User(
        userJson.id,
        userJson.name,
        userJson.email,
        undefined,  
        userJson.token
      );
    }
    return null; 
  }
}
