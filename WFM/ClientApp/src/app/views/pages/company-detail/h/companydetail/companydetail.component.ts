import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { bankAccount } from 'src/app/views/models/bankAccount.model';
import { Company } from 'src/app/views/models/company';
import { Country } from 'src/app/views/models/country';
import { IndustryType } from 'src/app/views/models/industry-type';
import { License } from 'src/app/views/models/license';
import { AlertService } from 'src/app/views/services/alert.service';
import { CompanyService } from 'src/app/views/services/company.service';
import { CountryService } from 'src/app/views/services/country.service';
import { IndustryTypeService } from 'src/app/views/services/industry-type.service';
import { environment } from 'src/environments/environment';

import $ from 'jquery';
import { TeamMemberService } from 'src/app/views/services/team-member.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Observable, Observer } from 'rxjs';
import Swal from 'sweetalert2';
import { AnimationSettingsModel, ButtonPropsModel, DialogComponent, PositionDataModel } from '@syncfusion/ej2-angular-popups';
import { ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor';
import { createElement } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-companydetail',
  templateUrl: './companydetail.component.html',
  styleUrls: ['./companydetail.component.scss'],
})
export class CompanydetailComponent implements OnInit {
  dynamictext: string;
  company: Company = new Company();
  countries: Country[] = [];
  cities: any = [];
  states: any = [];
  zipCodes: any = [];
  departments: any = [];
  selecteddepartments: any = [];
  bankAccount: any;
  licName: any;
  CompanyLicenseList: any = [];
  bankAccountform: bankAccount = new bankAccount();
  industryType: IndustryType[] = [];
  license: License = new License();
  base64Image: string = "";
  formData: FormGroup;
  LicformData: FormGroup;
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 10,
    autoReset: null,
    addRemoveLinks: true,
    errorReset: null,
    cancelReset: null,
    url: 'https://httpbin.org/post'
  };

  @ViewChild('Dialog', { static: false })
  public DialogInstance!: DialogComponent;
  @ViewChild('ImageEditor', { static: false })
  public ImageEditorInstance!: ImageEditorComponent;
  public toolbarItems: string[] = [];
  public header: string = 'Edit Profile Image';
  public showCloseIcon: boolean = true;
  public closeOnEscape: boolean = true;
  public width: string = '340px';
  public height: string = '420px';
  public visible: boolean = false;
  public animationSettings: AnimationSettingsModel = { effect: 'None' };
  public target: string = '.control-section';
  public position: PositionDataModel = { X: 'center', Y: 100 };
  public imgSrc: string = '';


  constructor(
    private companyService: CompanyService,
    private industryTypeService: IndustryTypeService,
    private countryService: CountryService,
    private _teamMemberService: TeamMemberService,
    private modalService: NgbModal,
    private _countryService: CountryService,
    private alert: AlertService,
    fb: FormBuilder,
    private el: ElementRef, private renderer: Renderer2,
  ) {


    this.formData = fb.group({
      companyName: ['', Validators.required],
      emailaddress: ['', Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')],
      url: ['', Validators.pattern('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}')],
      phoneNumber: ['', Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)]

    });

    this.LicformData = fb.group({
      phone: ['', Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)],
      federalNum: ['', Validators.pattern(/^\d{2}-\d{7}$/)],
      ssn: ['', Validators.pattern(/^\d{3}-\d{2}-\d{4}$/)],
      licenseType: ['', null],
      licenseNo: ['', null],
      Expiry: ['', null],
      name: ['', null],
      Country: ['', null],
      state: ['', null],
      city: ['', null],
      zipCode: ['', null],
      businessName: ['', null]
    });
  }

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  getDepartments() {
    this._teamMemberService.getDepartments().subscribe({
      next: (data: any) => {
        this.departments = data;
      },
      error: () => {
      }
    });
  }

  licAttachments: any[];

  onUploadSuccess(event: any): void {
    var model: any = {
      documentItem: event[0].dataURL,
      fileType: event[0].type.split('/')[1],
      isChecked: true,
      visible: true,
      fileName: event[0].name
    }
    this.licAttachments.push(model)
  }

  downloadFile(filePath: string, fileName: string): void {
    const src = filePath;
    const link = document.createElement("a")
    link.href = src
    link.download = fileName
    link.click()
    link.remove()
  }

  openVerticalCenteredModal(content: TemplateRef<any>) {
    this.LicformData.enable();
    this.LicformData.reset();
    this.license = new License();
    this.license.attachments = new Array();
    this.modalService.open(content, { centered: true, size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch(() => { });
  }

  ngOnInit(): void {
    this.licAttachments = new Array();
    this.license.attachments = new Array();
    this.getAllCountries();
    this.getIndustryTypes();
    this.getCompany();
    this.getIndividualLicenseCerts();
    this.getDepartments();
  }

  licenseList: any = [];

  OnlyProfileimagshow: any = "";

  getCompany() {
    debugger
    this.companyService.getCompany().subscribe((res) => {
      if (res != null)
        this.company = res;
      if (this.company.countryId != "" && this.company.countryId != null)
        this.getStates(this.company.countryId);
      if (this.company.mailingCountryId != "" && this.company.mailingCountryId != null)
        this.getStatesMailing(this.company.mailingCountryId);
      if (this.company.state != "" && this.company.state != null)
        this.getCitydataChange(this.company.state);
      if (this.company.city != "" && this.company.city != null)
        this.getZipcodedataChange(this.company.city);
      if (this.company.mailingState != "" && this.company.mailingState != null)
        this.getMailingCitydataChange(this.company.mailingState);
      if (this.company.mailingCity != "" && this.company.mailingCity != null)
        this.getMailingZipcodedataChange(this.company.mailingCity);
      this.croppedImage = environment.baseUrl + "/" + this.company.image;
      this.setimag = environment.baseUrl + "/" + this.company.image;
      if (this.company.bankAccount != null) {
        // this.bankAccountform = this.company.bankAccount
      }
      if (this.company.license != null) {
        this.CompanyLicenseList = this.company.license;
      }
      if (this.company.isReport == true)
        $('#IsReport').prop('checked', true);
      else
        $('#IsReport').prop('checked', false);

      if (this.company.invoices_Receipts == true)
        $('#Invoices_Receipts').prop('checked', true);
      else
        $('#Invoices_Receipts').prop('checked', false);

      if (this.company.isEmails == true)
        $('#IsEmails').prop('checked', true);
      else
        $('#IsEmails').prop('checked', false);

      console.log(this.company, 'company details');
    });
  }

  getIndividualLicenseCerts() {
    this._teamMemberService.getIndividualLicenseCerts().subscribe({
      next: (data: any[]) => {
        this.licenseList = data;

      },
      error: () => {
      }
    });
  }

  isDisabled: any = false;

  viewLicById(Id, content: TemplateRef<any>) {
    this.isDisabled = true;
    this.LicformData.disable();
    let findrecord = this.CompanyLicenseList.find(A => A.licenseType == Id);
    if (findrecord != undefined) {
      this.license = findrecord;
      this.modalService.open(content, { centered: true, size: 'lg' }).result.then((result) => {
        console.log("Modal closed" + result);
      }).catch(() => { });
      this.LicformData.disable();
    }
    else {
      this.license = new License();
    }
  }

  // storeid:any=0;
  getLicById(id, content: TemplateRef<any>) {
    this.isDisabled = false;
    this.LicformData.enable();
    // this.storeid = Id;
    this.LicformData.reset();
    this.LicformData.enable();
    let findrecord = this.CompanyLicenseList.find(A => A.id == id);
    if (findrecord != undefined) {
      this.getCities(findrecord.stateId);
      this.getZipCodes(findrecord.city);
      this.license = findrecord;
      this.modalService.open(content, { centered: true, size: 'lg' }).result.then((result) => {
        console.log("Modal closed" + result);
      }).catch(() => { });
    }
    else {
      this.license = new License();
    }
  }

  deleteLicense(id) {
    Swal.fire({
      title: 'Do you want to delete this record?',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let index = this.CompanyLicenseList.findIndex(a => a.id == id);
        this.CompanyLicenseList.splice(index, 1);
      }
    })
  }


  getLicName(value) {
    let findrecord = this.licenseList.find(A => A.id == value);
    if (findrecord != undefined) {
      return findrecord.nameofLicense;
    }
    else {
      return null;
    }
  }

  addLicense() {
    this.licAttachments.forEach(element => {
      this.license.attachments.push(element);
    });
    let record = this.CompanyLicenseList.findIndex(A => A.licenseType == this.license.licenseType);
    if (record == -1) {
      this.CompanyLicenseList.push(this.license);
      this.modalService.dismissAll();
    }
    else {
      this.CompanyLicenseList[record] = this.license;
      this.modalService.dismissAll();
    }
    this.license = new License();
    this.license.attachments = new Array();
    this.licAttachments = new Array();
  }

  getStatesChange(event) {
    let text = this.countries.find(x => x.id == event.target.value).countryName;
    this.getStates(event.target.value);
    if (text == 'Australia') {
      this.dynamictext = 'Post Code'
    }
    else {
      this.dynamictext = 'Zip Code'
    }
  }

  getStatesChangeforMailing(event) {
    this.getStatesMailing(event.target.value);
  }

  formatSSN(event: any): void {
    const value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedValue = value.replace(/^(\d{3})(\d{2})?(\d{0,4})?$/, (_, p1, p2, p3) => {
      let result = `${p1}`;
      if (p2) result += `-${p2}`;
      if (p3) result += `-${p3}`;
      return result;
    });
    this.license.socialSecurityNumber = formattedValue;
  }

  formatFederal(event: any): void {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    value = value.slice(0, 9); // Limit the input to 9 characters (2 digits + hyphen + 7 digits)

    const formattedValue = value.replace(/^(\d{2})(\d{0,7})?$/, (_, p1, p2) => {
      let result = `${p1}`;
      if (p2) result += `-${p2}`;
      return result;
    });

    this.license.federalIdNumber = formattedValue;
  }

  MailingState: any = [];

  getStates(value) {
    this._countryService.getStates(value).subscribe({
      next: (data: any[]) => {
        this.states = [];
        this.citydata = [];
        this.zipCodesdata = [];
        this.states = data;
      },
      error: () => {
      }
    });
  }

  getStatesMailing(value) {
    this._countryService.getStates(value).subscribe({
      next: (data: any[]) => {
        this.MailingState = [];
        this.cityMailingdata = [];
        this.zipMailingCodesdata = [];
        this.MailingState = data;
      },
      error: () => {
      }
    });
  }

  getCitiesChange(event) {
    this.getCities(event.target.value);
  }

  citydata: any = [];

  getCityChange(event) {
    this.getCitydataChange(event.target.value);
  }

  getCitydataChange(Id: any) {
    this._countryService.getCities(Id).subscribe({
      next: (data: any[]) => {
        this.citydata = [];
        this.zipCodesdata = [];
        this.citydata = data;
      },
      error: () => {
      }
    });
  }

  zipCodesdata: any = [];
  getZipcodeChange(event) {
    this.getZipcodedataChange(event.target.value);
  }

  getZipcodedataChange(Id: any) {
    this._countryService.getZipCodes(Id).subscribe({
      next: (data: any[]) => {
        this.zipCodesdata = [];
        this.zipCodesdata = data;
      },
      error: () => {
      }
    });
  }

  cityMailingdata: any = [];

  getMailingCityChange(event) {
    this.getMailingCitydataChange(event.target.value);
  }

  getMailingCitydataChange(Id: any) {
    this._countryService.getCities(Id).subscribe({
      next: (data: any[]) => {
        this.cityMailingdata = [];
        this.zipMailingCodesdata = [];
        this.cityMailingdata = data;
      },
      error: () => {
      }
    });
  }

  zipMailingCodesdata: any = [];
  getMailingZipcodeChange(event) {
    this.getMailingZipcodedataChange(event.target.value);
  }

  getMailingZipcodedataChange(Id: any) {
    this._countryService.getZipCodes(Id).subscribe({
      next: (data: any[]) => {
        this.zipMailingCodesdata = [];
        this.zipMailingCodesdata = data;
      },
      error: () => {
      }
    });
  }

  getCities(value) {
    this._countryService.getCities(value).subscribe({
      next: (data: any[]) => {
        this.cities = data;
      },
      error: () => {
      }
    });
  }

  getZipCodesChange(event) {
    this.getZipCodes(event.target.value)
  }

  getZipCodes(value) {
    this._countryService.getZipCodes(value).subscribe({
      next: (data: any[]) => {
        this.zipCodes = data;
      },
      error: () => {
      }
    });
  }

  getIndustryTypes() {
    this.industryTypeService.getIndustryTypes().subscribe((res) => {
      this.industryType = res;
    });
  }

  getAllCountries() {
    this.countryService.getAllCountry().subscribe((res) => {
      this.countries = res;
    });
  }

  getBankAccount() {
  }


  public saveCompany() {

    if (this.newimg == '' || this.newimg == null || this.newimg == undefined) {
        } else {
          this.company.image = this.newimg;
        }

    this.CompanyLicenseList.forEach(element => {
      element.id = "5931114f-de48-41da-877b-2677e5eb9288";
    });
    // this.company.bankAccount = this.bankAccountform;
    this.company.license = this.CompanyLicenseList;
    if ($('#IsReport').is(':checked'))
      this.company.isReport = true;
    else
      this.company.isReport = false;
    if ($('#Invoices_Receipts').is(':checked'))
      this.company.invoices_Receipts = true;
    else
      this.company.invoices_Receipts = false;
    if ($('#IsEmails').is(':checked'))
      this.company.isEmails = true;
    else
      this.company.isEmails = false;

    this.companyService
      .updateCompany(this.company)
      .subscribe(() => {
        this.alert.showToasterWithTitle(
          'success',
          'Company profile updated successfully.',
          'success'
        );
        //  this.ngOnInit();
      });
  }

  handleImageChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      // Check if the file type is either PNG or JPG
      if (this.isFileTypeValid(file)) {
        this.convertImageToBase64(file);
      } else {
        this.alert.showToasterWithTitle(
          'error',
          "Invalid file type. Please select a PNG or JPG file.",
          'error'
        );
        // Optionally, you can reset the input or handle the error in another way.
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

    // Read the image file as a data URL
    reader.readAsDataURL(file);
  }

  bankformreset() {
    this.bankAccountform = new bankAccount();
  }

  licenseformreset() {
    this.license = new License();
  }

  Changephonenumber(event: any) {
    // Extract digits from the entered phone number
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    // Format the phone number as (XXX) XXX-XXXX
    const formattedNumber = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
    this.company.phoneNumber = formattedNumber;
  }

  ChangeLicphonenumber(event: any) {
    // Extract digits from the entered phone number
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    // Format the phone number as (XXX) XXX-XXXX
    const formattedNumber = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
    this.license.phone = formattedNumber;
  }

  blobToBase64(blob: Blob): Observable<string> {
    return new Observable((observer: Observer<string>) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1]; // Extract the base64 part
        observer.next(base64String);
        observer.complete();
      };

      reader.onerror = (error) => {
        observer.error(error);
      };
    });
  }
  handleBlob(blob: Blob) {
    this.blobToBase64(blob).subscribe(
      (base64String: string) => {
        this.base64Image = base64String;
        // Do something with the Base64-encoded string
      },
      (error) => {
        console.error(error);
        // Handle the error
      }
    );
  }


  imageChangedEvent: any = "";
  croppedImage: any = "";
  setimag:any="";

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
   // this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    this.handleBlob(event.blob);
  }

  UploadImage() {
    alert(this.setimag);
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }


  public created(): void {
    if (this.ImageEditorInstance.theme && window.location.href.split('#')[1]) {
      this.ImageEditorInstance.theme = window.location.href.split('#')[1].split('/')[1];
    }
  }

  public imageLoaded(): void {
    if (this.imgSrc === '') {
      const canvas: HTMLCanvasElement | null = document.querySelector('#img-canvas');
      const image: HTMLImageElement | null = document.querySelector('#demo-img');
      const ctx: CanvasRenderingContext2D | null = canvas?.getContext('2d')!;

      if (canvas && image && ctx) {
        canvas.width = image.width < image.height ? image.width : image.height;
        canvas.height = canvas.width;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        document.querySelector('.e-profile')?.classList.remove('e-hide');
      }
    }
  }

  public dialogOpen(): void {
    const img: HTMLImageElement | null = document.querySelector('#demo-img');
    if (img) {

      this.ImageEditorInstance.open(img.src);
    }
  }

  public dialogClose(): void {
    const img: HTMLImageElement | null = document.querySelector('#demo-img');
    if (img) {
      this.ImageEditorInstance.open(img.src);
    }
  }

  // canvas click event
  public onOpenDialog(): void {

    this.DialogInstance.show();
  }

  public imageChanged(): void {
    const inputElement = document.getElementById('img-upload') as HTMLInputElement | null;

    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        // 'reader.result' contains the base64 representation of the uploaded image
        this.company.image = reader.result as string;
        this.ImageEditorInstance.open(this.company.image);

        // Do any other processing with the base64 image if needed
        console.log('Base64 Image:', this.company.image);
        this.newimg = this.company.image.replace("data:" + file.type + ";base64,", '');
      };

      // Read the image as a data URL
      reader.readAsDataURL(file);
    }
  }

  newimg = "";
  public fileOpened(): void {
    this.ImageEditorInstance.select('circle');
  }

  public dlgOpenButtonClick(): void {
    const inputElement = document.getElementById('img-upload');
    if (inputElement) {
      inputElement.click();
    }
  }

  public dlgResetBtnClick(): void {
    this.ImageEditorInstance.reset();
  }

  public dlgRotateBtnClick(): void {
    this.ImageEditorInstance.rotate(-90);
  }

  public dlgDoneBtnClick(): void {
    this.ImageEditorInstance.crop();
    const croppedData: ImageData = this.ImageEditorInstance.getImageData();
    const canvas: HTMLCanvasElement | null = document.querySelector('#img-canvas');
    const ctx: CanvasRenderingContext2D | null = canvas?.getContext('2d')!; // Non-null assertion
    const parentDiv: HTMLElement | null = document.querySelector('.e-profile');
    if (canvas && ctx && parentDiv) { // Null check added
      const tempCanvas: HTMLCanvasElement = parentDiv.appendChild(createElement('canvas') as HTMLCanvasElement);
      const tempContext: CanvasRenderingContext2D = tempCanvas.getContext('2d')!;
      tempCanvas.width = croppedData.width;
      tempCanvas.height = croppedData.height;
      tempContext.putImageData(croppedData, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
      tempCanvas.remove();
      parentDiv.style.borderRadius = '100%';
      canvas.style.backgroundColor = '#fff';
      this.DialogInstance.hide();
      if (this.imgSrc !== '') {
        const img: HTMLImageElement | null = document.querySelector('#demo-img');
        if (img) {
          img.src = this.imgSrc;
        }
      }
    }
  }

  public dlgButtons: ButtonPropsModel[] =
    [
      { click: this.dlgOpenButtonClick.bind(this), buttonModel: { content: 'Open', isPrimary: false, cssClass: 'e-custom-img-btn e-img-custom-open' } },
      { click: this.dlgResetBtnClick.bind(this), buttonModel: { content: 'Reset', isPrimary: false, cssClass: 'e-custom-img-btn e-img-custom-reset' } },
      { click: this.dlgRotateBtnClick.bind(this), buttonModel: { content: 'Rotate', isPrimary: false, cssClass: 'e-custom-img-btn e-img-custom-rotate' } },
      { click: this.dlgDoneBtnClick.bind(this), buttonModel: { content: 'Apply', isPrimary: true, cssClass: 'e-custom-img-btn e-img-custom-apply' } }
    ];

  public canvasClicked(): void {
    this.DialogInstance.show();
  }

  ngAfterViewInit(): void {
    let imageHide = this.el.nativeElement.getElementsByClassName('sb-desktop-wrapper')[0];

    if (imageHide) {
      this.renderer.listen(imageHide, 'click', (args: any): void => {
        if (args.target.className.indexOf('col-lg-12 control-section') > -1 || args.target.className.indexOf('sb-content') > -1) {
          this.DialogInstance.hide();
        }
      });
    }
  }
}
