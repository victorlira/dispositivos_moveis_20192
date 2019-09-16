import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profile'
})
export class ProfilePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
