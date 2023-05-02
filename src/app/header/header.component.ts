import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private auth:AuthService){}
  signIn(){
    this.auth.signIn()
  }
  ngOnInit(): void {
    this.isLoggedIn=this.auth.isLoggedIn;
    this.auth.changeLoginStatus.subscribe(status=>{
      this.isLoggedIn=status;
    })
  }
}
