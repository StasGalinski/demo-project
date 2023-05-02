import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
export class AuthResponseData {
  idToken: string;
  expiresIn: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn= false;
  changeLoginStatus = new Subject<boolean>();
  tokenId: string;
  tokenExpirationDate: Date;
  constructor(private http: HttpClient) {}
  signIn() {
    this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.fireBaseApiKey,
        { returnSecureToken: true }
      )
      .subscribe((res) => {
        this.isLoggedIn=true;
        this.changeLoginStatus.next(true)
        console.log(res.expiresIn);
        this.tokenId = res.idToken;
        this.tokenExpirationDate = new Date(
          new Date().getTime() + +res.expiresIn * 1000
        );
        localStorage.setItem('token', this.tokenId);
        localStorage.setItem(
          'tokenExpirationDate',
          this.tokenExpirationDate.getTime() + ''
        );
      });
  }
  logOut() {
    this.tokenId = null;
    this.tokenExpirationDate = null;
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    this.isLoggedIn = false;
    this.changeLoginStatus.next(false)
  }
//   autoLogin() {
//     console.log('BOOGA');
//     if (
//       localStorage.getItem('token') &&
//       +localStorage.getItem('tokenExpirationDate') > +new Date().getTime()
//     ) {
//       this.tokenId = localStorage.getItem('token');
//       this.tokenExpirationDate = new Date(
//         localStorage.getItem('expirationDate')
//       );
//     }
//   }
  getTokenId() {
    return this.tokenId;
  }
}
