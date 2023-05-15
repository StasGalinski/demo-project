import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private scrollSubject = new Subject<string>();
  public scrollObservable = this.scrollSubject.asObservable();

  scrollToElement(elementId:string){
    this.scrollSubject.next(elementId)
  }
}
