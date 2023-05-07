import { Component,Input } from '@angular/core';
import { User } from '../../user.model';
@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.sass']
})
export class UserItemComponent {
@Input() user: User
imageLoadError = false;
}
