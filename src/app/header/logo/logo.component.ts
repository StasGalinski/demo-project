import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.sass'],
})
export class LogoComponent {
  public svgIcon: SafeHtml;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.http
      .get('assets/images/download.svg', { responseType: 'text' })
      .subscribe(
        (data) => (this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(data))
      );
  }
}
