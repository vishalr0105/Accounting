/*
 *ngFor="let c of oneDimArray | sortBy:'asc'"
 *ngFor="let c of arrayOfObjects | sortBy:'asc':'propertyName'"
 */
import { Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { debug } from 'console';
import { orderBy } from 'lodash';

@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {
  transform(value: any[], order = '', column: string = ''): any[] {
    if (!value || order === '' || !order) {
      return value;
    } // no array
    if (value.length <= 1) {
      return value;
    } // array with only one item
    if (!column || column === '') {
      if (order === 'asc') {
        return value.sort();
      } else {
        return value.sort().reverse();
      }
    } // sort 1d array
    return orderBy(value, [order]);
  }
}

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}

  public transform(
    value: any,
    type: string
  ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(value);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}

@Pipe({
  name: 'TrustHtml',
  pure: true, // This allows the pipe to only run once
})
export class TrustHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(pUnsafe: string) {
    return this.sanitizer.bypassSecurityTrustHtml(pUnsafe);
  }
}
@Pipe({
  name: 'SearchList',
  pure: true,
})
export class SearchListPipe implements PipeTransform {
  transform(value: any[], input: string) {
    if (input) {
      input = input.toLowerCase();
      return value.filter((el: any)=> 
        el.fullName?.toLowerCase().indexOf(input) > -1
        ||
        el.designation?.toLowerCase().indexOf(input) > -1
        ||
        el.email?.toLowerCase().indexOf(input) > -1)
    }
      return value;
    }
}
@Pipe({
  name: 'SearchList',
  pure: true,
})
export class SearchListPipe1 implements PipeTransform {
  transform(value: any[], input: string) {
    if (input) {
      input = input.toLowerCase();
      return value.filter((el: any) =>
        el.fullName?.toLowerCase().indexOf(input) > -1
        ||
        el.designation?.toLowerCase().indexOf(input) > -1
        ||
        el.email?.toLowerCase().indexOf(input) > -1)
    }
    return value;
  }
}
