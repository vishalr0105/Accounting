import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Dialog, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2/base';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  
})
export class FaqComponent implements OnInit {
  searchquery = '';
  @ViewChild('ejDialog') ejDialog: DialogComponent|any;
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;
  isVideoOpen = false;
  videolink: SafeResourceUrl;
  constructor(public domSanitizationService: DomSanitizer) { }

  ngOnInit(): void {
    this.initilaizeTarget();
    this.videolink = this.domSanitizationService.bypassSecurityTrustResourceUrl(this.videolink.toString());
  }
  public initilaizeTarget(){
    this.targetElement = this.container.nativeElement.parentElement;
    
  }
  public onOpenDialog = function (event: any): void {
    // Call the show method to open the Dialog
    //'https://www.youtube.com/embed/9HYKU2zzj-0?si=CwkLYwc_cOPpkNAB'
    this.videolink = this.domSanitizationService.bypassSecurityTrustResourceUrl('');
    this.isVideoOpen = true;
    this.ejDialog.show();
  };
  public onOverlayClick: EmitType<object> = () => {
    var iframe = document.getElementsByTagName('iframe')[0];
    iframe.src = '';
    this.ejDialog.hide();
  }

}
