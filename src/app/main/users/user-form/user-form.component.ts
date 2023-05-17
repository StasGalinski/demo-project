import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { AuthService } from 'src/app/auth.service';

export interface Position {
  title: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  isSubmitted = false;
  positions: Position[] = [
    { title: 'Frontend Developer' },
    { title: 'Backend Developer' },
    { title: 'Tester' },
    { title: 'Designer' },
  ];
  error: Error = null;
  private postSubscription: Subscription;
  @ViewChild('f') userForm: NgForm;
  constructor(private http: HttpClient, private userService: UserService, private auth:AuthService) {}
  ngOnInit(): void {}
  onSubmit() {
    const { name, email, phone, imagePath, position } = this.userForm.value;
    this.postSubscription = this.userService
      .addUser({ name, email, phone, imagePath, position })
      .subscribe({
        next: () => {
          console.log('no err')
          this.userForm.reset();
          this.isSubmitted = true;
        },
        error: (error:HttpErrorResponse) => {
          console.log(error)
          this.error = error.error.error;
        },
      });
  }
  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
