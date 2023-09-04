import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
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
  base64String: string;
  selectedFilePath: string;
  error: Error = null;
  private postSubscription: Subscription;
  @ViewChild('f') userForm: NgForm;
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {}
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const maxSizeInBytes = 1048576;
    if (file && file.size > maxSizeInBytes) {
      alert('Selected file is too big, Maxium size is 1Mb');
      event.target.value = null;
      this.selectedFilePath = null;
      return;
    }
    if (file) {
      this.selectedFilePath = file.name;
      this.convertToBase64(file);
    }
  }
  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.base64String = e.target.result.split(',')[1];
    };
    reader.readAsDataURL(file);
  }
  onSubmit() {
    const { name, email, phone, position } = this.userForm.value;
    const image = this.base64String;
    console.log(image);
    this.postSubscription = this.userService
      .addUser({ name, email, phone, image, position })
      .subscribe({
        next: () => {
          this.userForm.reset();
          this.isSubmitted = true;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.error = error;
        },
      });
  }
  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
