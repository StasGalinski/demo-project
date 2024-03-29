import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject, catchError, map, of, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersChanged = new Subject<void>();
  private loadedUsers: User[] = [];
  private renderedUsersCount = 6;
  constructor(private http: HttpClient,private auth:AuthService) {}

  getUsers() {
    return this.http
      .get(
        'https://fir-project-31497-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="$key"&limitToLast=' +
          this.renderedUsersCount
      )
      .pipe(
        map((resData) => {
          const updatedUsers: User[] = [];
          for (let key in resData) {
            updatedUsers.unshift(resData[key]);
          }
          return updatedUsers;
        })
      );
  }
  addUser({ name, email, phone, image, position }) {
    return this.http
      .post(
        'https://fir-project-31497-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth='+this.auth.getTokenId(),
        { name, email, phone, image, position }
      )
      .pipe(
        catchError(err=>{
          let errorMessage= 'An unknown error occured'
          console.log(err)
          switch(err.error.error){

            case "Permission denied":  errorMessage="Must be signed in"
          }
          return throwError(()=>new Error(errorMessage))
        }),
        map((res: HttpResponse<Response>) => {
          this.usersChanged.next();
          this.auth.logout()
        }),

      );
  }
  increaseRenderedUsers() {
    this.renderedUsersCount += 6;
    this.getUsers();
    this.usersChanged.next();
  }
}
