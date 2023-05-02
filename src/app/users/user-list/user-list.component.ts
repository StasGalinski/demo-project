import { Component } from '@angular/core';
import { User } from '../user.model';
import {OnInit} from '@angular/core'
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {
  page=6;
  error:string = null
  loadedUsers: User[] = []
  constructor(private usersService:UserService){}
  ngOnInit(): void {
    this.loadedUsers = this.usersService.getUsers()
    this.usersService.usersChanged.subscribe(updatedUsers=>{
      this.loadedUsers = this.usersService.getUsers()
    })
  }
  showMoreUsers(){
    this.page= this.page+6;
  }
}
