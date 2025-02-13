import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLogin } from 'src/app/views/models/user-login.model';
import { AlertService, DialogType } from 'src/app/views/services/alert.service';
import { AppointmentService } from 'src/app/views/services/appointment.service';
import { AuthService } from 'src/app/views/services/auth.service';
import { ConfigurationService } from 'src/app/views/services/configuration.service';
import { Utilities } from '../../../services/utilities';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { json } from 'ngx-custom-validators/src/app/json/validator';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {

  userLogin = new UserLogin();
  returnUrl: any;
  isLoading = false;
  formResetToggle = true;
  modalClosedCallback: () => void;
  loginStatusSubscription: any;
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;
  @Input()
  isModal = false;
  auth2: any;
  constructor(private route: ActivatedRoute,
    private alertService: AlertService,
    private authService: AuthService,
    private socialService: SocialAuthService,
    private configurations: ConfigurationService,
    private router: Router) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.socialService.authState.subscribe((user) => {
      window.location.href = this.returnUrl;
    });
   
  }

  onLoggedin(e: Event) {
    // e.preventDefault();
    // localStorage.setItem('isLoggedin', 'true');
    // if (localStorage.getItem('isLoggedin')) {
    //   this.router.navigate([this.returnUrl]);
    // }
    this.isLoading = true;
    this.authService
      .loginWithPassword(
        this.userLogin.userName,
        this.userLogin.password,
        this.userLogin.rememberMe,
        ''
      )
      .subscribe(
        (user) => {
          //TODO: Uncomment after testing
          // this.alertService.showToaster('Signed in successfully 123', 'success');
          // localStorage.setItem('currentUserId', user.id);
          // localStorage.setItem('userName', user.fullName);
          // localStorage.setItem('jobTitle', user.jobTitle);
          // this.isLoading = true;
          // localStorage.setItem('isLoggedin', 'true');
          // if (localStorage.getItem('isLoggedin')) {
          //   window.location.href = this.returnUrl
          // }
        
        },
        (error) => {
          this.alertService.stopLoadingMessage();

          if (Utilities.checkNoNetwork(error)) {
            this.alertService.showToasterWithTitle(
              Utilities.noNetworkMessageCaption,
              Utilities.noNetworkMessageDetail,
              'error',
            );
          } else {
            const errorMessage = Utilities.getHttpResponseMessage(error);
            if (errorMessage) {
              this.alertService.showToasterWithTitle(
                'Unable to login',
                this.mapLoginErrorMessage(errorMessage),
                'error'
              );
            } else {
              this.alertService.showToasterWithTitle(
                'Unable to login',
                'An error occured whilst logging in, please try again later.\nError: ' +
                Utilities.getResponseBody(error),
                'error'
              );
            }
          }

          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        }
      );
  }

  

  offerAlternateHost() {
    if (
      Utilities.checkIsLocalHost(location.origin) &&
      Utilities.checkIsLocalHost(this.configurations.baseUrl)
    ) {
      this.alertService.showDialog(
        'Dear Developer!\nIt appears your backend Web API service is not running...\n' +
        'Would you want to temporarily switch to the online Demo API below?(Or specify another)',
        DialogType.prompt,
        (value: string) => {
          this.configurations.baseUrl = value;
          this.configurations.tokenUrl = value;
          this.alertService.showToasterWithTitle(
            'API Changed!',
            'The target Web API has been changed to: ' + value,
            'warning'
          );
        },
        null,
        null,
        null,
        this.configurations.fallbackBaseUrl
      );
    }
  }

  mapLoginErrorMessage(error: string) {
    if (error === 'invalid_username_or_password') {
      return 'Invalid username or password';
    }

    if (error === 'invalid_grant') {
      return 'This account has been disabled';
    }

    return error;
  }

  reset() {
    this.formResetToggle = false;

    setTimeout(() => {
      this.formResetToggle = true;
    });
  }

  signInWithGoogle(): void {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => console.log(x));
  }

  signInWithFB(): void {
    this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => console.log(x));
  }

  callLogin() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {

        //Print profile details in the console logs

        let profile = googleAuthUser.getBasicProfile();
        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });

  }

  googleAuthSDK() {
    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '836345802027-s4dvqscsotr7h19nrrhh992vantqbc8q.apps.googleusercontent.com',
          plugin_name: 'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLogin();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

}

