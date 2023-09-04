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
import { PlaceHolderImageComppnent } from './main/users/user-list/user-item/placeholder-image/placeholder-image';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { SuccessNotificationComponent } from './main/users/user-form/success-notification/success-notification.component';
import { ShowTooltipDirective } from './show-tooltip.directive';
import { SvgIconComponent } from './shared/svg-icon/svg-icon.component';
import { ImageSliderModule } from './image-slider/image-slider.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AddBase64PrefixPipe } from './main/users/user-list/user-item/add-base64-prefix.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserListComponent,
    UserFormComponent,
    UsersComponent,
    UserItemComponent,
    ImageComponent,
    PlaceHolderImageComppnent,
    LoadingSpinnerComponent,
    SuccessNotificationComponent,
    ShowTooltipDirective,
    SvgIconComponent,
    AddBase64PrefixPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ImageSliderModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
