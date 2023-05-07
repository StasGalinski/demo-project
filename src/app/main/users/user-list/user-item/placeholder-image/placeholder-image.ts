import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: 'app-placeholder-image',
  template: '<div [innerHTML]="svgIcon"></div>'
})
export class PlaceHolderImageComppnent {
  public svgIcon: SafeHtml;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.http
      .get('assets/images/photo-cover.svg', { responseType: 'text' })
      .subscribe(
        (data) => (this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(data))
      );
  }
}
