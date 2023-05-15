import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
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
}
