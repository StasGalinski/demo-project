import { Component } from '@angular/core';
import { SlideInterface } from './image-slider/types/slide.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'demo-project';
  slides:SlideInterface[] = [
    {url: '/assets/images/image-1.jpeg', title: 'picture1'},
    {url: '/assets/images/image-2.jpeg', title: 'picture2'},
    {url: '/assets/images/image-3.jpeg', title: 'picture3'},
    {url: '/assets/images/image-4.jpeg', title: 'picture4'},
  ]
}
