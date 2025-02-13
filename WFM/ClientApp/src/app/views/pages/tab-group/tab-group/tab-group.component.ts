import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements OnInit {

  @Input() codeContent: any;
  defaultNavActiveId = undefined;
  copy: string = 'copy';
  
  constructor() { }

  ngOnInit() {
    // console.log(this.codeContent);
  }

  copied(e: any) {
    if(e.isSuccess) {
      this.copy = 'copied';
      setTimeout(() => {
        this.copy = 'copy';
      }, 500);
    }
    
    
  }

}
