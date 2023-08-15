import { Component, Input } from '@angular/core';
import { SlideInterface } from '../types/slide.interface';
@Component({
  selector: 'image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.sass'],
})
export class ImageSliderComponent {
  @Input() slides: SlideInterface[] = [];
  currentIndex: number = 2;
  get getCurrentSlideUrl(): string {
    return `url('${this.slides[this.currentIndex].url}')`;
  }
  goPrevious(){
    if(this.currentIndex > 0){
      this.currentIndex--;
    }else {
      this.currentIndex=this.slides.length
    }
  }
  goNext(){
    if(this.currentIndex < this.slides.length){
      this.currentIndex++
    }
    else {this.currentIndex=0}
  }
  goToSlide(index:number){
    this.currentIndex = index;
  }
}
