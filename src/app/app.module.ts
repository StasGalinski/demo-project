import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './main/users/user-list/user-list.component';
import { UserFormComponent } from './main/users/user-form/user-form.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './main/users/users.component';
import { UserItemComponent } from './main/users/user-list/user-item/user-item.component';
import { ImageComponent } from './main/image/image.component';
import { LogoComponent } from './header/logo/logo.component';
import { PlaceHolderImageComppnent } from './main/users/user-list/user-item/placeholder-image/placeholder-image';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserListComponent,
    UserFormComponent,
    UsersComponent,
    UserItemComponent,
    ImageComponent,
    LogoComponent,
    PlaceHolderImageComppnent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
