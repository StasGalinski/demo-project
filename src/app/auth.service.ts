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
  loginStatusChanged = new Subject<string>();
  private tokenId: string;
  tokenExpirationDate: Date;
  constructor(private http: HttpClient) {}
  signUp() {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.fireBaseApiKey,
        { returnSecureToken: true }
      )
      .subscribe((res) => {
        this.tokenId = res.idToken;
        this.loginStatusChanged.next(this.getTokenId());
      });
  }
  logout() {
    this.tokenId = null;
    this.tokenExpirationDate = null;
    this.loginStatusChanged.next(null)
  }
  getTokenId() {
    return this.tokenId;
  }
}
