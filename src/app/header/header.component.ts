import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ScrollService } from '../scroll.service';
import { trigger,state, animate, style, transition } from '@angular/animations';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  animations: [
    trigger('burgerState',[
      transition(':enter',[
        style({
          left: "-200px"
        }),
        animate('200ms',style({left: 0}))
      ]),
      transition(':leave',[
        style({
          left: 0
        }),
        animate('200ms',style({left:"-200px"}))
      ]),
    ])
  ]
})
export class HeaderComponent implements OnInit {
  burgerIsOpen = false;
  isLoggedIn = false;
  tokenId: string;
  constructor(
    private auth: AuthService,
    private scrollService: ScrollService
  ) {}
  ngOnInit(): void {
    this.auth.loginStatusChanged.subscribe((status) => {
      this.tokenId = status;
      this.isLoggedIn = status === null ? false : true;
    });
  }
  signUpHandler() {
    !this.isLoggedIn ? this.auth.signUp() : this.auth.logout();
  }
  scrollTo() {
    this.scrollService.scrollToElement('user-list');
  }
  toggleBurger(){
    this.burgerIsOpen= this.burgerIsOpen ? false: true
  }
}
