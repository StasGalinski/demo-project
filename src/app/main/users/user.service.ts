import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject, map } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
export class Result {
  id: number;
  name: string;
  email: string;
  phone: string;
  photoId: string;
  positionId: number;
  position: string;
  registrationTimestamp: string;
}
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
      .get<{ result: Result[] }>(
        'https://localhost:7146/Users/users?page=1&count=' +
          this.renderedUsersCount
      )
      .pipe(
        map((resData) => {
          for (let result of resData.result) {
            updatedUsers.push({
              name: result.name,
              email: result.email,
              phone: result.phone,
              imagePath: result.photoId,
              position: result.position,
            });
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
