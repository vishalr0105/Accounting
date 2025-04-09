import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLogin } from 'src/app/views/models/user-login.model';
import { AlertService, DialogType } from 'src/app/views/services/alert.service';
import { AppointmentService } from 'src/app/views/services/appointment.service';
import { AuthService } from 'src/app/views/services/auth.service';
import { ConfigurationService } from 'src/app/views/services/configuration.service';
import { Utilities } from '../../../services/utilities';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import { environment } from 'src/environments/environment';
import { map, timer } from 'rxjs';
import { request } from 'https';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from 'ng2-charts';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { updateDecoratorElement } from '@syncfusion/ej2/pdfviewer';
import { OidcHelperService } from 'src/app/views/services/oidc-helper.service';
import { JwtHelper } from 'src/app/views/services/jwt-helper';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
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
  //otp='';
  showOtpbox = false;
  dynamitxts = ['Productivity', 'Profits', 'Delight'];
  @ViewChild('dynamictxt', { static: true }) dynamictxt: ElementRef;
  loginform: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private authService: AuthService,
    private socialService: SocialAuthService,
    private configurations: ConfigurationService,
    public fb: FormBuilder,
    private oidcHelperService: OidcHelperService,
    private router: Router
  ) {
    console.log(this.userLogin);
    this.createloginForm();
  }
  ngAfterViewInit(): void {
    sessionStorage.removeItem('current_user');
  }
  createloginForm() {
    this.loginform = this.fb.group({
      userName: new FormControl(
        // 'Gururaj.chatty@in.etaprise.com',
        'Test.admin@in.nexright.com',
        Validators.required
      ),
      password: new FormControl('BumiArmada@123', Validators.required),
      isSocial: new FormControl(false, Validators.required),
      otp: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  getLoginOtp() {
    this.authService
      .getLoginOtp(
        this.loginform.controls['userName'].value,
        this.loginform.controls['password'].value
      )
      .subscribe((res: any) => {
        if (res && res.showOtpBox == true) {
          this.showOtpbox = true;
          this.isLoading = false;
          this.alertService.showToaster(res.message, 'info');
        } else if (res && res.showOtpBox == false) {
          this.alertService.showToaster(res.message, 'info');
        } else if (res.twoFactorEnable == false) {
          this.onLoggedin(null);
        }
      });
  }

  // onLoggedin(e: Event) {
  //   if (this.loginform.controls['otp'].value == '' && e != null) {
  //     this.getLoginOtp();
  //   } else {
  //     this.isLoading = true;
  //     this.authService
  //       .loginWithPassword(
  //         this.loginform.controls['userName'].value,
  //         this.loginform.controls['password'].value,
  //         false,
  //         this.loginform.controls['otp'].value,

  //       )
  //       .subscribe(
  //         (user: any) => {
  //           if (user.userType == 'Admin') {
  //             localStorage.setItem('currentUserId', user.id);
  //             localStorage.setItem('userName', user.fullName);
  //             localStorage.setItem('jobTitle', user.jobTitle);

  //             this.isLoading = true;
  //             localStorage.setItem('isLoggedin', 'true');
  //             window.location.href = "/admin"
  //           }
  //           else if (user.userType == 'TeamMember') {
  //             localStorage.setItem('currentUserId', user.id);
  //             localStorage.setItem('userName', user.fullName);
  //             localStorage.setItem('jobTitle', user.jobTitle);

  //             this.isLoading = true;
  //             localStorage.setItem('isLoggedin', 'true');
  //             window.location.href = "/admin"
  //           }

  //           else if (user.userType == 'Technician') {
  //             this.alertService.showToaster('Signed in successfully 123', 'success');
  //             localStorage.setItem('currentUserId', user.id);
  //             localStorage.setItem('userName', user.fullName);
  //             localStorage.setItem('jobTitle', user.jobTitle);
  //             this.isLoading = true;
  //             localStorage.setItem('isLoggedin', 'true');

  //             if (localStorage.getItem('isLoggedin')) {
  //               window.location.href = "/technician/home"
  //             }

  //           }

  //           else if (user.userType == 'SubContractorTechnician') {
  //             debugger
  //             this.alertService.showToaster('Signed in successfully 123', 'success');
  //             localStorage.setItem('currentUserId', user.id);
  //             localStorage.setItem('userName', user.fullName);
  //             localStorage.setItem('jobTitle', user.jobTitle);
  //             this.isLoading = true;
  //             localStorage.setItem('isLoggedin', 'true');
  //             if (localStorage.getItem('isLoggedin')) {
  //               window.location.href = "/technician/home"
  //             }
  //           }

  //           else if (user.userType == 'Customer') {
  //             localStorage.setItem('currentUserId', user.id);
  //             localStorage.setItem('userName', user.fullName);
  //             localStorage.setItem('jobTitle', user.jobTitle);
  //             this.isLoading = true;
  //             localStorage.setItem('isLoggedin', 'true');
  //             if (localStorage.getItem('isLoggedin')) {
  //               window.location.href = "/customer/"
  //             }
  //           }
  //           else if (user.userType == 'SuperAdmin') {
  //             localStorage.setItem('currentUserId', user.id);
  //             localStorage.setItem('userName', user.fullName);
  //             localStorage.setItem('jobTitle', user.jobTitle);
  //             this.isLoading = true;
  //             localStorage.setItem('isLoggedin', 'true');
  //             if (localStorage.getItem('isLoggedin')) {
  //               window.location.href = "/superadmin/"
  //             }
  //           }
  //           else if (user.userType == 'SubContractorAdmin') {
  //             localStorage.setItem('currentUserId', user.id);
  //             localStorage.setItem('userName', user.fullName);
  //             localStorage.setItem('jobTitle', user.jobTitle);
  //             this.isLoading = true;
  //             localStorage.setItem('isLoggedin', 'true');
  //             if (localStorage.getItem('isLoggedin')) {
  //               window.location.href = "/subcontractoradmin/"
  //             }
  //           }
  //           else {
  //             this.isLoading = false;
  //             this.alertService.showToaster('Invalid credential please fill valid credential', 'error');
  //           }

  //         },
  //         (error) => {
            // this.alertService.stopLoadingMessage();

  //           if (Utilities.checkNoNetwork(error)) {
  //             this.alertService.showToasterWithTitle(
  //               Utilities.noNetworkMessageCaption,
  //               Utilities.noNetworkMessageDetail,
  //               'error',
  //             );
  //           } else {
  //             const errorMessage = Utilities.getHttpResponseMessage(error);
  //             if (errorMessage) {
  //               this.alertService.showToasterWithTitle(
  //                 'Unable to login',
  //                 this.mapLoginErrorMessage(errorMessage),
  //                 'error'
  //               );
  //             } else {
  //               this.alertService.showToasterWithTitle(
  //                 'Unable to login',
  //                 'An error occured whilst logging in, please try again later.\nError: ' +
  //                 Utilities.getResponseBody(error),
  //                 'error'
  //               );
  //             }
  //           }

  //           setTimeout(() => {
  //             this.isLoading = false;
  //           }, 500);
  //         }
  //       );
  //   }
  // }

  onLoggedin(e: Event) {
    this.oidcHelperService
      .userLogin(
        this.loginform.controls['userName'].value,
        this.loginform.controls['password'].value
      )
      .subscribe((res) => {
        console.log(res, 'res====');
        this.authService.saveToken(JSON.stringify(res.access_token));
        const jwtHelper = new JwtHelper();
        const decodedToken = jwtHelper.decodeToken(res.access_token) as any;
        if(decodedToken.roleName=='Admin'){
          this.router.navigate(['/admin']);
        }else{
          this.router.navigate(['/user']);
        }
      });
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
    this.socialService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((x) => console.log(x));
  }

  signInWithFB(): void {
    this.socialService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((x) => console.log(x));
  }

  callLogin() {
    this.auth2.attachClickHandler(
      this.loginElement.nativeElement,
      {},
      (googleAuthUser: any) => {
        let profile = googleAuthUser.getBasicProfile();
        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
      },
      (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }

  googleAuthSDK() {
    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: environment.google_client_id,
          plugin_name: 'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email',
        });
        this.callLogin();
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement('script');
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs?.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'google-jssdk');
  }
}
