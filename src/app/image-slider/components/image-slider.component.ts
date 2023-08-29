import { Component, Input } from '@angular/core';

import { animate, style, transition, trigger, useAnimation } from '@angular/animations';
import { scaleIn,scaleOut } from './image-slider.animation';
@Component({
  selector: 'image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.sass'],
  animations: [
    trigger('carouselAnimation', [
      transition('void=>*', useAnimation(scaleIn,{params:{time:'1300ms'}})),
      transition('*=>void', useAnimation(scaleOut,{params:{time:'1300ms'}})),
    ]),
  ],
})
export class ImageSliderComponent {
  currentSlide = 0;
  images = [
    {
      src: '/assets/images/image-1.jpeg',
    },
    {
      src: '/assets/images/image-2.jpeg',
    },
    {
      src: '/assets/images/image-3.jpeg',
    },
    {
      src: '/assets/images/image-4.jpeg',
    },
    {
      src: '/assets/images/image-5.jpeg',
    },
  ];
  onPreviusClick() {
    const previus = this.currentSlide - 1;
    this.currentSlide = previus < 0 ? this.images.length - 1 : previus;
    console.log('clicked');
  }
  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.images.length ? 0 : next;
  }
}
