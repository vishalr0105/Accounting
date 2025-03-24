import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighlightModule } from 'ngx-highlightjs';
import { PaymentService } from './views/services/payment.service';
import { CommandColumnService, EditService, GridAllModule, GroupService, InfiniteScrollService, LazyLoadGroupService, PageService, SortService, GridModule, SearchService, ToolbarService, PdfExportService, ExcelExportService } from '@syncfusion/ej2-angular-grids';
import { DataLabelService, LegendService, LineSeriesService, TooltipService } from '@syncfusion/ej2-angular-charts';
import { OidcHelperService } from './views/services/oidc-helper.service';
import { LocalStoreManager } from './views/services/local-store-manager.service';
import { SiteEndpoint } from './views/services/site-endpoint.service';
import { AccountEndpoint } from './views/services/account-endpoint.service';
import { AccountService } from './views/services/account.service';
import { AppTranslationService, TranslateLanguageLoader } from './views/services/app-translation.service';
import { AppTitleService } from './views/services/app-title.service';
import { ConfigurationService } from './views/services/configuration.service';
import { ThemeManager } from './views/services/theme-manager';
import { AlertService } from './views/services/alert.service';
import { HttpClient, HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthService } from './views/services/auth.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './views/pages/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from './views/services/appointment.service';
import { Helper } from './views/pipes/helper';
import { NewroleService } from './views/services/newrole.service';
import { CompanydetailComponent } from './views/pages/company-detail/companydetail/companydetail.component';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { CommonModule, DatePipe } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';
import { ProfileComponent } from './views/pages/general/profile/profile.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FeatherIconModule } from './core/feather-icon/feather-icon.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { RegisterComponent } from './views/pages/auth/register/register.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { ChargebeeJsAngularWrapperModule } from '@chargebee/chargebee-js-angular-wrapper';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';
import { BsModalService } from 'ngx-bootstrap/modal';
import { OnlydigitsDirective } from './onlydigits.directive';
import { ExternalAppComponent } from './views/pages/auth/external-app/external-app.component';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { RouterModule } from '@angular/router';
import { TabGroupComponent } from './views/pages/tab-group/tab-group/tab-group.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { ExistingOrganizationComponent } from './views/pages/existing-organization/existing-organization.component';
import { UserService } from './views/pages/general/services/user.service';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    RegisterComponent,
    AppComponent,
    ErrorPageComponent,
    LoginComponent,
    ExistingOrganizationComponent,
    CompanydetailComponent,
    ProfileComponent,
    TabGroupComponent,
    OnlydigitsDirective,
    ExternalAppComponent,
  ],
  imports: [
    ChargebeeJsAngularWrapperModule,
    FormsModule,
    ImageCropperModule,
    SocialLoginModule,
    CommonModule,
    GridModule,
    TooltipModule,
    DatePickerModule,
    DropzoneModule,
    RouterModule,
    NgxDatatableModule,
    GridAllModule,
    FeatherIconModule,
    BrowserModule,
    AppRoutingModule,
    NgbDropdownModule,
    BrowserAnimationsModule,
    NgbNavModule,
    ClipboardModule,
    HighlightModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    CarouselModule.forRoot(),
    ArchwizardModule,
    DialogModule,
    ButtonModule ,
    ImageEditorModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLanguageLoader,
      },
    }),

  ],
  providers: [
    UserService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '836345802027-s4dvqscsotr7h19nrrhh992vantqbc8q.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('763951915061949')
          },

        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    ToolbarService,
    SearchService,
    PdfExportService,
    BsModalService,
    DatePipe,
    AuthService,
    AppointmentService,
    AlertService,
    ThemeManager,
    ConfigurationService,
    AppTitleService,
    AppTranslationService,
    AccountService,
    AccountEndpoint,
    SiteEndpoint,
    LocalStoreManager,
    OidcHelperService,
    NewroleService,
    Helper,
    PaymentService,
    LegendService,
    TooltipService,
    DataLabelService,
    LineSeriesService,
    SortService,
    PageService,
    LazyLoadGroupService,
    SortService,
    GroupService,
    InfiniteScrollService,
    EditService,
    CommandColumnService,
    PaymentService,
    ExcelExportService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

