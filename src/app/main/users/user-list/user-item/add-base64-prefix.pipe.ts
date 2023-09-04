import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addBase64Prefix',
})
export class AddBase64PrefixPipe implements PipeTransform {
  transform(base64String: string | null): string | null {
    return base64String ? `data:image;base64,${base64String}` : null;
  }
}
