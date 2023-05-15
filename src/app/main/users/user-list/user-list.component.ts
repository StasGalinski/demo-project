import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../user.model';
import { OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ScrollService } from 'src/app/scroll.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass'],
})
export class UserListComponent implements OnInit {
  private scrollSubscription: Subscription;

  isLoading = true;
  error: string = null;
  loadedUsers: User[] = [];
  constructor(
    private usersService: UserService,
    private scrollService: ScrollService,
    private elementRef: ElementRef
  ) {}
  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (data) => this.fillUsersAndEndLoading(data),
    });
    this.usersService.usersChanged.subscribe((updatedUsers) => {
      this.usersService.getUsers().subscribe({
        next: (data) => this.fillUsersAndEndLoading(data),
      });
    });
    this.scrollSubscription = this.scrollService.scrollObservable.subscribe(
      (elementId: string) => {
        if (elementId === 'user-list') {
          this.scrollToElement();
        }
      }
    );
  }
  showMoreUsers() {
    this.isLoading = true;
    this.usersService.increaseRenderedUsers();
    this.scrollToElement()
  }
  private fillUsersAndEndLoading(data: User[]) {
    this.loadedUsers = data;
    this.isLoading = false;
  }
  scrollToElement() {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
