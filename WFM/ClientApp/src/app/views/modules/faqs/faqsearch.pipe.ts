import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'faqsearch'
})
export class FaqsearchPipe implements PipeTransform {

  transform(value: any[], input: string): any {
    if (input) {
      input = input.toLowerCase();
      return value.filter((el: any) =>
        el.q.toLowerCase().indexOf(input) > -1
        ||
        el.ans.toLowerCase().indexOf(input) > -1)
        ;
    }
    return value;
  
  }

}
