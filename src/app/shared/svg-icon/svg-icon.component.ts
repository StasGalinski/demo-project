import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.sass'],
})
export class SvgIconComponent implements OnInit{
  @Input() path :string //'assets/images/...
  public svgIcon: SafeHtml;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.http
      .get(this.path, { responseType: 'text' })
      .subscribe(
        (data) => (this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(data))
      );
  }
}
