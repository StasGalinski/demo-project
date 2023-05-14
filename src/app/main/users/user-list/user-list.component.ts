import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../user.model';
import { OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass'],
})
export class UserListComponent implements OnInit {
  isLoading = true;
  error: string = null;
  loadedUsers: User[] = [];
  constructor(private usersService: UserService) {}
  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (data)=>this.fillUsersAndEndLoading(data)
    });
    this.usersService.usersChanged.subscribe((updatedUsers) => {
      this.usersService.getUsers().subscribe({
        next: (data)=>this.fillUsersAndEndLoading(data)
      });
    });
  }
  showMoreUsers() {
    this.isLoading = true;
    this.usersService.increaseRenderedUsers();
  }
  private fillUsersAndEndLoading(data: User[]) {
    this.loadedUsers = data;
    this.isLoading = false;
  }
}
