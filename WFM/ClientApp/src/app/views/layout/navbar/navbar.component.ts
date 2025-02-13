import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';
import { DashboardService } from '../../services/dashboard.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
import { SearchTags } from './globalsearchtags';
import { RemoteAsstChatService } from '../../services/remote-assistant-signal-r.service';
import { AlertService } from '../../services/alert.service';
import { DialogType } from '@syncfusion/ej2/richtexteditor';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CompanyService } from '../../services/company.service';
import { _TrueTypeCompositeGlyphFlag } from '@syncfusion/ej2/pdf';
// import { SubscriptionPlanService } from '../../services/subscription-plan.service';
import { UserService } from '../../pages/general/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy {
 // NotificationList: any[];
  showAll: boolean = false;
  searchform: FormGroup;
  data = [];
  subscriptionExpiryDate:Date;
  hidesubscriptionbanner=false;
  Objsubscripton = new Subscription();
  daydiff=0;
  showExpiringBanner=false;
  showExpiredBanner=false;
  imageBasePath = environment.baseUrl;
  objCurUser:any;
  emailId:any;
  profileImg:any
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public authService: AuthService, public fb: FormBuilder,
    private router: Router, public dashBoard: DashboardService,
    public remoteAssistantChatservice:RemoteAsstChatService,
    private alertservice:AlertService,
    // public subscriptionservice:SubscriptionPlanService,
    public sanitizer:DomSanitizer,
    public userService:UserService,
    private cdRef: ChangeDetectorRef,
  ) {

    this.data = SearchTags;
  }
  ngOnDestroy(): void {

    this.Objsubscripton.unsubscribe();
  }

  ngOnInit(): void {
    this.userService.email$.subscribe(res=>{
      this.emailId=res
    })
    this.userService.profile$.subscribe(res=>{
      this.profileImg=res
    })
    this.userService.userGetProfile().subscribe(userProfile=>{
      this.profileImg=`${environment.baseUrl}${userProfile.profileImage}`
    })

    this.userService.getEmail().subscribe(res=>{
      this.userService.setEmail(res.email)
    })

    this.objCurUser=JSON.parse(sessionStorage.getItem('current_user'));
    this.AllNotification();
    this.createSearchForm();
    //this.searchform.valueChanges.subscribe(m=> {
    //  var li = document.getElementsByClassName('searchList_Li')[0] as HTMLElement;
    //  if (li) {
    //    li.blur();
    //    li.toggleAttribute('active');
    //  }
    //});
    this.getSubscription();
  }
  createSearchForm() {
    this.searchform = this.fb.group({ searchquery: new FormControl() });

  }
  removeNewNotifications(){
    this.dashBoard.NotificationList=[];
    this.Objsubscripton.add(
      this.dashBoard.clearNotifications().subscribe()
    );
  }
  arrowkeyLocation = 0;
  keyDown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 38: // Arrow Up
        this.arrowkeyLocation--;
        break;
      case 40: // Arrow Down
        this.arrowkeyLocation++;
        break;
    }
  }

  get userName(): string {
    return this.authService.currentUser ? this.authService.currentUser.userName : '';
  }

  get getImage(): string {
    return this.authService.currentUser ? environment.baseUrl + "/" + this.authService.currentUser.userImage : 'https://via.placeholder.com/30x30';
  }
  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  AllNotification()
  {

    // this.dashBoard.getNotificationList(true).subscribe(res=>{
    //   this.dashBoard.NotificationList=res;
    //   //this.count=this.dashBoard.NotificationList.length

    // })
  }
  clearAllNotifications() {
    this.dashBoard.NotificationList = [];
  }
  onLogout(e: Event) {
    e.preventDefault();

    // Call the logout methods
    this.authService.logout();
    this.authService.logoutUser();

    // Remove the login-related data from localStorage
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('access_token');  // Optionally remove the token

    // Navigate to login page
    this.router.navigate(['/login']).then(() => {
      // Perform a hard refresh to reload the page
      window.location.reload();
    });
  }

  gotonotification(){
      this.router.navigateByUrl('/admin/notifications');
  }
  getSubscription(){
    this.hidesubscriptionbanner=Boolean(sessionStorage.getItem('hidesubscriptionbanner'));

    if(this.hidesubscriptionbanner==false || this.hidesubscriptionbanner==undefined){
    // this.subscriptionservice.GetSubscriptionsByUser(this.objCurUser.email).subscribe((res:any)=>{
    //   this.subscriptionExpiryDate= new Date(res[0].next_billing_at*1000);
    //   var curdate=new Date();
    //   //this.daydiff = curdate.valueOf() - this.subscriptionExpiryDate.valueOf();
    //   const differenceInMs: number = Math.abs(this.subscriptionExpiryDate.getTime()-curdate.getTime());
    //   const millisecondsInDay: number = 1000 * 60 * 60 * 24;
    //   this.daydiff = Math.floor(differenceInMs / millisecondsInDay);
    //   if(curdate>this.subscriptionExpiryDate){
    //     this.showExpiredBanner=true
    //   }else{
    //     if(this.daydiff<3){
    //     this.showExpiringBanner=true}}
    // })
  }
  }
  fnhideSubscriptionBanner(){
    this.hidesubscriptionbanner=!this.hidesubscriptionbanner;
    sessionStorage.setItem('hidesubscriptionbanner',this.hidesubscriptionbanner.toString());
  }
}
