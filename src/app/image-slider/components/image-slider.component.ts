import { Component, Input } from '@angular/core';
import { SlideInterface } from '../types/slide.interface';
import { trigger,state,style,animate,transition } from '@angular/animations';
@Component({
  selector: 'image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.sass'],
})
export class ImageSliderComponent {
  @Input() slides: SlideInterface[] = [];
  currentImageIndex: number = 0;
  images: string[] = ['/assets/images/image-1.jpeg', '/assets/images/image-2.jpeg']; // Ваши изображения

  prevImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }
}
