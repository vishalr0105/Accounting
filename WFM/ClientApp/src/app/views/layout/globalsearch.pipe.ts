import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'globalsearch'
})
export class GlobalsearchPipe implements PipeTransform {

  transform(value: any[], input: string): any {
    
    if (input) {
      input = input.toLowerCase();
      return value.filter((el: any)=> 
        el.keywords?.toLowerCase().indexOf(input) > -1
        ||
        el.heading?.toLowerCase().indexOf(input) > -1
        ||
        el.link?.toLowerCase().indexOf(input) > -1)
    }
      return value;
    
  }

}
