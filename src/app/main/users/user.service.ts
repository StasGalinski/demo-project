import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject, map } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersChanged = new Subject<void>();
  private loadedUsers: User[] = [];
  private renderedUsersCount = 6;
  constructor(private http: HttpClient) {}

  getUsers() {
    const updatedUsers: User[] = [];
    this.http
      .get(
        'https://fir-project-31497-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="$key"&limitToLast=' +
          this.renderedUsersCount
      )
      .pipe(
        map((resData) => {
          for (let key in resData) {
            updatedUsers.push(resData[key]);
          }
        })
      )
      .subscribe({ error: (error) => {} });
    this.loadedUsers = updatedUsers;
    return this.loadedUsers;
  }
  addUser({ name, email, phone, imagePath, position }) {
    return this.http
      .post(
        'https://fir-project-31497-default-rtdb.europe-west1.firebasedatabase.app/users.json',
        { name, email, phone, imagePath, position }
      )
      .pipe(
        map((res: HttpResponse<Response>) => {
          this.usersChanged.next();
        })
      );
  }
  increaseRenderedUsers() {
    this.renderedUsersCount += 6;
    this.getUsers();
    this.usersChanged.next();
  }
}
