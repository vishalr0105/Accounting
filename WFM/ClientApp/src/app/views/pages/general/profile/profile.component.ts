import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { profileModel } from 'src/app/views/models/profileModel';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AlertService } from 'src/app/views/services/alert.service';
import { MessageSeverity } from 'src/app/views/services/alert.service';
import { profileservece } from 'src/app/views/services/profile.services';
import { Company } from 'src/app/views/models/company';
import { CompanyService } from 'src/app/views/services/company.service';
import { environment } from 'src/environments/environment';
import { DatePipe, Location } from "@angular/common";
import * as $ from 'jquery';
import { changepassword } from 'src/app/views/models/passwordchange';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/views/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  bankAccount: any;
  company: Company = new Company();
  isChecked: boolean = false;
  passwordForm: FormGroup;
  showOtpBox=false;
  @ViewChild('resetpassword')resetpassword:TemplateRef<any>;
  @ViewChild('paymentsettingpopup')paymentsettingpopup:TemplateRef<any>
  @ViewChild('form') form!: NgForm;
  formAccountSecurity:FormGroup;

  constructor(private modalService: NgbModal,
    private profileservece: profileservece,
    private alertService: AlertService,
    private companyService: CompanyService,
    private location: Location,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {
    this.passwordForm = this.fb.group({
      oldpassword:new FormControl('',Validators.required),
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]],
      confirmPassword: ['', [Validators.required]],
      resetPwdCode:['']
    }, { validator: this.passwordMatchValidator });
    this.profileeditmodelform = new profileModel();
  }

  profileeditmodelform: profileModel = new profileModel();
  passwordform: changepassword = new changepassword();
  subscription: Subscription;
  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword').value;
    const confirmPassword = formGroup.get('confirmPassword').value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  ngOnInit(): void {
    this.getCompany();
    this.Getprofile();
    this.createAccountSecurityForm();
    var curUser=JSON.parse(sessionStorage.getItem('current_user'))
    this.formAccountSecurity.controls['userName'].setValue(curUser.userName);
  }

  openVerticalCenteredModal(content: any): void {
    if (!this.IsUpdatePassword){
      this.passwordform.oldpassword = null;
      this.passwordform.newpassword = null;
    }
    if (!this.IsUpdateProfile)
      this.Getprofile();
    this.modalService.open(content, { centered: true });
  }
  resetProfile() {
    this.Getprofile();
  }

  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  getCompany() {
    this.companyService.getCompany().subscribe((res) => {
      this.company = res;
      console.log(this.company, '(this.company');
    });
  }

  get userFullName(): string {
    return this.authService.currentUser ? this.authService.currentUser.fullName : '';
  }

  saveCheckboxValue() {

    if (this.IsUpdatePassword) {
      this.IsUpdatePassword = false;
    } else {
      this.passwordform = new changepassword();
    }
    this.profileeditmodelform.userImage = this.base64Image;
    if (this.IsUpdateProfile) {
      this.IsUpdateProfile = false;
    } else {
      this.profileeditmodelform = this.StoreProfileData;
    }

    let model = {
      AuthenticalAppCode: $('#authenticator').is(':checked'),
      MobileAppPrompt: $('#mobile').is(':checked'),
      TextMessage: $('#textmeassage').is(':checked'),
      SecurityQuestion: $('#security').is(':checked'),
      twostepverification: $('#verify').is(':checked'),
      newpasswordsave: this.passwordform,
      Profileupdate: this.profileeditmodelform
    }

    this.profileservece.SaveProfilecheck(model)
      .subscribe((res) => {
        // Check if the response indicates success (modify this condition based on your API response)
        if (res && MessageSeverity.success) {
          this.Getprofile();
          this.alertService.showToasterWithTitle(
            'Success',
            `Profile update successfully.....!`,
            'success'
          );
        } else {
          // Display error toaster for invalid file type
          this.alertService.showToasterWithTitle(
            'Failed',
            `Error while saving Skill`,
            'error'
          );
        }
      },
        () => {
          this.Getprofile();
          this.alertService.showToasterWithTitle(
            'error',
            'Invalid Password. Please try again.',
            'error'
          );
        });
  }
  IsUpdatePassword: any = false;
  savepassword() {

    this.profileservece.newsavepassword(this.passwordForm.value)
      .subscribe((res:any) => {
        this.showOtpBox=res.showOtpBox;
        // Check if the response indicates success (modify this condition based on your API response)
        if (res && MessageSeverity.success && res.showOtpBox==false) {
          this.alertService.showToasterWithTitle(
            'Success',
            res.message,
            'success'
          );
        }else if(res.showOtpBox==true){
         // this.Getprofile();
          this.alertService.showToasterWithTitle(
            'Success',
            res.message,
            'success'
          );
          this.modalService.open(this.resetpassword, { centered: true });
        } else {
          // Display error toaster for invalid file type
            this.passwordForm.reset();
          this.alertService.showToasterWithTitle(
            'error',
            res.message,
            'error'
          );
        }
      });
    this.IsUpdatePassword = true;
  }
  IsUpdateProfile: any = false;
  saveprofile() {
  debugger;
    this.profileeditmodelform.userImage = this.base64Image;
    this.profileservece.Profileupdate(this.profileeditmodelform)
      .subscribe((res) => {
        // Check if the response indicates success (modify this condition based on your API response)
        if (res && MessageSeverity.success) {
          this.alertService.showToasterWithTitle(
            'Success',
            `Profile Updated Successfully.....!`,
            'success'
          );
        } else {
          // Display error toaster for invalid file type
          this.alertService.showToasterWithTitle(
            'error',
            'Invalid file type. Please select a PNG or JPG file.',
            'error'
          );
        }
      });
    this.IsUpdateProfile = true;
  }

  goBack(): void {
    this.location.back();
  }
  createAccountSecurityForm(){
    this.formAccountSecurity=this.fb.group({
      'twoFactorAuth':new FormControl(),
      'txtMsgSms':new FormControl(),
      'txtMsgEmail':new FormControl(),
      'txtMsgEmailAndSms':new FormControl(),
      'userName':new FormControl(""),
    })
  }
  updateCheckboxes(optionId){
    switch(optionId){
      case 1:
        if(this.formAccountSecurity.controls['twoFactorAuth'].value==false){
          this.formAccountSecurity.controls['txtMsgSms'].setValue(false);
          this.formAccountSecurity.controls['txtMsgEmail'].setValue(false);
          this.formAccountSecurity.controls['txtMsgEmailAndSms'].setValue(false);
        }
        break;
        case 2:
        if(this.formAccountSecurity.controls['txtMsgSms'].value==true){
          this.formAccountSecurity.controls['txtMsgEmail'].setValue(false);
          this.formAccountSecurity.controls['txtMsgEmailAndSms'].setValue(false);
        }
        break;
        case 3:
        if(this.formAccountSecurity.controls['txtMsgEmail'].value==true){
          this.formAccountSecurity.controls['txtMsgSms'].setValue(false);
          this.formAccountSecurity.controls['txtMsgEmailAndSms'].setValue(false);
        }
        break;
        case 4:
        if(this.formAccountSecurity.controls['txtMsgEmailAndSms'].value==true){
          this.formAccountSecurity.controls['txtMsgEmail'].setValue(true);
            this.formAccountSecurity.controls['txtMsgSms'].setValue(true);
        }
        break;
    }
  }
  updateAccountSecurity(){
    this.profileservece.updateAccountSecurity(this.formAccountSecurity.value).subscribe((res:any)=>{
      this.alertService.showToasterWithTitle('',res.message,'info');
    })
  }

  Getprofile() {
    this.profileservece.Getprofile().subscribe((res:any) => {
      this.formAccountSecurity.controls['twoFactorAuth'].setValue(res.twostepverification);
      this.formAccountSecurity.controls['txtMsgSms'].setValue(res.txtMsgSms);
      this.formAccountSecurity.controls['txtMsgEmail'].setValue(res.txtMsgEmail);
      this.formAccountSecurity.controls['txtMsgEmailAndSms'].setValue(res.txtMsgEmailAndSms);
      this.profileeditmodelform = res;
      this.StoreProfileData = res;
      this.profileeditmodelform.userImage = res.userImage
      if(!this.croppedImage){
      this.croppedImage = environment.baseUrl + "/" + res.userImage;
      }
    });
  }
  StoreProfileData: any;
  OnlyProfileimagshow: any = "";
  base64Image: any = "";
  handleImageChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      // Check if the file type is either PNG or JPG
      if (this.isFileTypeValid(file)) {
        this.convertImageToBase64(file);
      } else {
        this.alertService.showToasterWithTitle(
          'error',
          "Invalid file type. Please select a PNG or JPG file.",
          'error'
        );
      }
    }
  }

  isFileTypeValid(file: File): boolean {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    return allowedTypes.includes(file.type);
  }

  convertImageToBase64(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      // Remove the prefix "data:image/png;base64,"
      this.OnlyProfileimagshow = base64String;
      this.base64Image = base64String.replace("data:" + file.type + ";base64,", '');
    };

    reader.readAsDataURL(file);
  }

  imageChangedEvent: any = "";
  croppedImage: any = "";

  fileChangeEvent(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.croppedImage = reader.result; // Display the selected image immediately
        this.base64Image = base64String.replace("data:" + file.type + ";base64,", '');
      };
      reader.readAsDataURL(file);
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
  }

  UploadImage() {
    alert(this.croppedImage);
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'MM-dd-yyyy') || '';
  }

  formatPhoneNumber(event: any) {
    let phoneNumber = this.profileeditmodelform.phoneNumber;
    // Remove all non-numeric characters from the input
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // Limit the input to a maximum of 10 digits
    if (phoneNumber.length > 10) {
      phoneNumber = phoneNumber.substr(0, 10);
    }

    // Format as (###) ###-####
    if (phoneNumber.length > 3) {
      phoneNumber = `(${phoneNumber.substr(0, 3)}) ${phoneNumber.substr(3)}`;
    }
    if (phoneNumber.length > 9) {
      phoneNumber = `${phoneNumber.substr(0, 9)}-${phoneNumber.substr(9)}`;
    }

    // Update the model with formatted phone number
    this.profileeditmodelform.phoneNumber = phoneNumber;
  }

  isValidPhoneNumber(phoneNumber: string): boolean {

    // Validate exactly 10 digits in the format (###) ###-####
    if(phoneNumber!=null){
    return phoneNumber.match(/^\(\d{3}\) \d{3}-\d{4}$/) !== null;
    }
    return false;
  }

  isUpdateButtonDisabled(form: NgForm): boolean {
    // Disable update button if phone number is not valid or form is invalid
    return !this.isValidPhoneNumber(this.profileeditmodelform.phoneNumber) || form.invalid;
  }
}
