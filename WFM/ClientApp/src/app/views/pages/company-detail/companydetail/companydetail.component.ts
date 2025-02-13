import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
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
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { guid } from '@fullcalendar/core';
import { Guid } from '@syncfusion/ej2/pdf-export';
import { CommonModule, DatePipe } from '@angular/common';
import {
  DropzoneConfigInterface,
  DropzoneDirective,
} from 'ngx-dropzone-wrapper';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Observer } from 'rxjs';
import Swal from 'sweetalert2';
import {
  AnimationSettingsModel,
  ButtonPropsModel,
  Dialog,
  DialogComponent,
  DialogModule,
  DialogUtility,
  PositionDataModel,
} from '@syncfusion/ej2-angular-popups';
import {
  ImageEditorComponent,
  ImageEditorModule,
} from '@syncfusion/ej2-angular-image-editor';
import { createElement } from '@syncfusion/ej2-base';
import { Account } from '../../../models/Customer.model';
import { Attributes } from '../../../models/attributes';
import { AccountService } from 'src/app/views/services/account.service';
import { AuthService } from 'src/app/views/services/auth.service';
import { EmitType } from '@syncfusion/ej2/base';
import { highlightSearch } from '@syncfusion/ej2-angular-dropdowns';
import { CommandModel } from '@syncfusion/ej2-angular-grids';
import { ProgressbarService } from 'src/app/views/services/progressbar.service';
import { email } from 'ngx-custom-validators/src/app/email/validator';

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
  base64Image: string = '';
  formData: FormGroup;
  editmode = false;
  LicformData: FormGroup;
  BankformData:FormGroup;
  public commands: CommandModel[];
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 10,
    autoReset: null,
    addRemoveLinks: true,
    errorReset: null,
    cancelReset: null,
    url: 'https://httpbin.org/post',
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
  @ViewChild('AddBankAccountModal') addBankAccountModal: TemplateRef<any>;
  @ViewChild('AddlicenceModal') addlicenceModal:TemplateRef<any>;
  @ViewChild('clientForm') clientForm: NgForm;
  @ViewChild('shipAddress') shipAddress: NgForm;
  @ViewChild('address2') address2: NgForm;
  @ViewChild('search') searchElementRef: ElementRef;
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('map2') mapElement2: any;
  @ViewChild('pacInput') mapSearch: ElementRef;
  @ViewChild('mapSearchService') mapSearchService: ElementRef;
  @ViewChild('billingAddress') billingAddress: ElementRef;
  @ViewChild('otpModal') otpModal!: TemplateRef<any>;
  @ViewChild('otp1') otp1!: ElementRef<HTMLInputElement>;
  @ViewChild('otp2') otp2!: ElementRef<HTMLInputElement>;
  @ViewChild('otp3') otp3!: ElementRef<HTMLInputElement>;
  @ViewChild('otp4') otp4!: ElementRef<HTMLInputElement>;
  @ViewChild('otp5') otp5!: ElementRef<HTMLInputElement>;
  @ViewChild('otp6') otp6!: ElementRef<HTMLInputElement>;
 otpInput: FormGroup;
  map: google.maps.Map;
  client: Account = new Account();
  mapService: google.maps.Map;
  marker: google.maps.Marker;
  marker2: google.maps.Marker;
  Attribute = [];
  createAttribute: Attributes[] = [];
  isLoading = false;
  currencyType:any;
  mapBilling: google.maps.Map;
  todayDate: string;
  constructor(
    private companyService: CompanyService,
    private industryTypeService: IndustryTypeService,
    private countryService: CountryService,
    private _teamMemberService: TeamMemberService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private _countryService: CountryService,
    private alert: AlertService,
    private fb: FormBuilder,
    private el: ElementRef,
    private renderer: Renderer2,
    private pgbservice:ProgressbarService,
    private accountservice:AccountService,
    private authservice:AuthService,
  ) {
    this.otpInput = this.fb.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
      otp5: ['', Validators.required],
      otp6: ['', Validators.required]
    });
    this.formData = fb.group({
      industryTypeId:['',Validators.required],
      companyName: ['',Validators.required],
      numberofEmployees:['',Validators.required],
      emailaddress: [
        '',
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'),
      ],
      url: [
        '',
        Validators.pattern(
          'https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,}'
        ),
      ],
      phoneNumber: ['', Validators.pattern('^[0-9]*$')],
      taxRegistrationNumber: [''],
      Address: [''],
      MailingAddress: [''],
      City: [''],
      State: [''],
      mailingCity: [''],
      mailingZipcode: [''],
      MailingState: [''],
      ZipCode: [''],
      CountryId: [null],
      MailingCountryId: [''],
      LegalInformation: [''],
      NumberOfEmployees: [''],
      NumberofFieldTechnicians: [''],
      IsActive: [true],
      TaxRegistrationNumber: [''],
      Currency: [''],
      CountryName: [''],
    });

    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = today.getDate().toString().padStart(2, '0');
    this.todayDate = `${year}-${month}-${day}`;
  }

  @ViewChild(DropzoneDirective, { static: false })
  directiveRef?: DropzoneDirective;

  getDepartments() {
    this._teamMemberService.getDepartments().subscribe({
      next: (data: any) => {
        this.departments = data;
      },
      error: (error) => {},
    });
  }

  licAttachments: any[];

  onUploadSuccess(event: any): void {
    var model: any = {
      documentItem: event[0].dataURL,
      fileType: event[0].type.split('/')[1],
      isChecked: true,
      visible: true,
      fileName: event[0].name,
    };
    this.licAttachments.push(model);
  }

  downloadFile(filePath: string, fileName: string): void {
    // const link = document.createElement('a');
    // link.href = `${environment.baseUrl}`+"/"+ filePath;
    // link.download = fileName;
    // link.target = '_blank';
    // link.click();
    const src = filePath;
    const link = document.createElement('a');
    link.href = src;
    link.download = fileName;
    link.click();
    link.remove();
  }

  openVerticalCenteredModal(content: TemplateRef<any>) {
    this.LicformData.enable();
    this.LicformData.reset();
    this.license = new License();
    this.license.attachments = new Array();

    this.modalService
      .open(content, { centered: true, size: 'lg' })
      .result.then((result) => {
        console.log('Modal closed' + result);
      })
      .catch((res) => {

      });
  }

  ngOnInit(): void {

    this.pgbservice.showprogress=true;
    this.getCurrencies();
    this.BankformData = this.fb.group({
      accountHolderName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      routingNumber: ['', Validators.required],
      bankName: ['', Validators.required]
    });
    this.LicformData = this.fb.group({
      // phone: ['', Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)],
      // federalNum: [''], //Validators.pattern(/^\d{2}-\d{7}$/)
      socialSecurityNumber: [''], //Validators.pattern(/^\d{3}-\d{2}-\d{4}$/)
      licenseType: ['', null],
      licenseNo: ['', null],
      expirationDate: ['', null],
      name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
      ],
      // name: ['', null],
      // Country: ['', null],
      // state: ['', null],
      // city: ['', null],
      // zipCode: ['', null],
      // businessName: ['', null],
      issuedByAuthority: ['', Validators.required],
      issuedDate: ['', null],
    });
    this.commands = [
      {
        buttonOption: {
          iconCss: 'e-icons e-edit',
          cssClass: 'e-flat',
        },
        title: "edit"
      },
      {
        buttonOption: {
          iconCss: 'e-icons e-delete',
          cssClass: 'e-flat'
        },
        title: 'delete'
      },
    ];

    this.licAttachments = new Array();
    this.license.attachments = new Array();
    this.getCompany();
//    this.getAllCountries();
    this.getIndustryTypes();

    this.getIndividualLicenseCerts();
    this.getDepartments();
  }
  getCurrencies(){
    // this.assetManegmentservice.getCurrencies().subscribe((res:any) => {
    //   // this.currencyType = res;
    // })
  }
  licenseList1: any = [];

  OnlyProfileimagshow: any = '';

  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  getCompany() {

    this.companyService.getCompany().subscribe((res) => {
      if (res != null) this.company = res;
      this.company.companyName = res.companyName;
      this.client.serviceAddress = res.address;
      this.client.serviceCity = res.city;
      this.client.serviceCountry = res.countryName;
      this.client.serviceState = res.state;
      this.client.serviceAddressZipcodeId = res.zipCode;
      this.company;
      this.pgbservice.showprogress=false;
      this.mapService = new google.maps.Map(this.mapElement2.nativeElement, {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 8,
        mapTypeId: 'roadmap',
      });

      const map = this.mapService;
      const geocoder = new google.maps.Geocoder();
      const bounds = new google.maps.LatLngBounds();
      geocoder.geocode({ address: this.company.address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const location = results[0].geometry.location;
          // Get latitude and longitude from the location object
          const lat = location.lat();
          const lng = location.lng();
          if (this.marker) {
           this.marker.setPosition(results[0].geometry.location);
           this.client.longitudeService = results[0].geometry.location
             .lng()
             .toString();
           this.client.latitudeService = results[0].geometry.location
             .lat()
             .toString();
         } else {
          this.marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            // Add custom icon for the building
            icon: {
                url: '../../../../../assets/images/others/isometric-building-icon-vector-7431001-removebg-preview.png', // Specify the path to your building icon
                scaledSize: new google.maps.Size(50, 50), // Adjust the size as needed
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(25, 50) // Adjust the anchor point if necessary
            }
        });
         }
         this.client.serviceAddress = '';
          this.client.serviceCity = this.company.city;
          this.client.serviceAddressZipcodeId = '';
//          this.client.serviceCity = '';
          this.client.serviceCountry = '';
          this.client.serviceState = '';
          var address =this.company.address;

          this.isLoading = true;
          results[0].address_components.map((x) => {
            if (x.types[0] == 'route') {
             // address += ` , ${x.long_name}`;
            } else if (x.types[0] == 'sublocality_level_2') {
            //  address += ` , ${x.long_name}`;
            } else if (x.types[0] == 'sublocality_level_1') {
              //address += ` , ${x.long_name}`;
            } else if (x.types[0] == 'locality') {

              //this.client.serviceCity = x.long_name;
              this.client.serviceCity=this.company.city?this.company.city:x.long_name;

            } else if (x.types[0] == 'postal_code') {
              this.client.serviceAddressZipcodeId = x.long_name;
            } else if (x.types[0] == 'administrative_area_level_1') {
              this.client.serviceState = x.long_name;
            } else if (x.types[0] == 'country') {
              this.client.serviceCountry = x.long_name;
            }
            this.client.serviceAddress = address;
          });
          this.isLoading = false;

          this.client.longitudeService = results[0].geometry.location.lng().toString();
          this.client.latitudeService = results[0].geometry.location.lat().toString();

          // Create a marker for each place.

          if (results[0].geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(results[0].geometry.viewport);
          } else {
            bounds.extend(results[0].geometry.location);
          }
          map.fitBounds(bounds);

        } else {
          console.error(
            'Geocode was not successful for the following reason: ' + status
          );
        }
      });
      this.croppedImage = environment.baseUrl + '/' + this.company.image;
      this.setimag = this.company.image;
      console.log(this.setimag,'setimagsetimag')
      if (this.company.bankAccount != null) {
      }
      if (this.company.license != null) {
        this.CompanyLicenseList = this.company.license;
        console.log(this.CompanyLicenseList,'this.CompanyLicenseListthis.CompanyLicenseList')
      }
      if (this.company.isReport == true) $('#IsReport').prop('checked', true);
      else $('#IsReport').prop('checked', false);

      if (this.company.invoices_Receipts == true)
        $('#Invoices_Receipts').prop('checked', true);
      else $('#Invoices_Receipts').prop('checked', false);

      if (this.company.isEmails == true) $('#IsEmails').prop('checked', true);
      else $('#IsEmails').prop('checked', false);

      //this.CompanyList = res;
      // this.bankAccount.companyId = this.company.id;
      // this.bankAccountform.companyId = this.company.id;
      console.log(this.company, 'company details');
    });
  }

  getIndividualLicenseCerts() {
    this.licenseList1 = [
      {
        id: 1,
        nameofLicense: 'Asbestos Services Company License',
      },
      {
        id: 2,
        nameofLicense: 'Demolition Contractor Company License',
      },
      {
        id: 3,
        nameofLicense: 'Electrical Contracting Company License',
      },
      {
        id: 4,
        nameofLicense: 'Elevator Contractor Company License',
      },
      {
        id: 5,
        nameofLicense: 'Fire Protection Contractor Company License',
      },

      {
        id: 6,
        nameofLicense: 'General Contractor Company License',
      },
      {
        id: 7,
        nameofLicense: 'Home Improvement Contractor Company License',
      },
      {
        id: 8,
        nameofLicense: 'Lead Services Company License',
      },
      {
        id: 9,
        nameofLicense: 'Manufactured Housing Builder License',
      },
      {
        id: 10,
        nameofLicense: 'Masonry Contractor Company License',
      },
      {
        id: 11,
        nameofLicense: 'Mechanical / HVAC Contractor Company License',
      },
      {
        id: 12,
        nameofLicense: 'Other Construction Industry Company License',
      },
      {
        id: 13,
        nameofLicense: 'Plumbing Contractor Company License',
      },
      {
        id: 14,
        nameofLicense: 'Right of Way Contractor Company License',
      },
      {
        id: 15,
        nameofLicense: 'Roofing Contractor Company License',
      },
      {
        id: 16,
        nameofLicense: 'Sign Contractor Company License',
      },
      {
        id: 17,
        nameofLicense: 'Tree Contractor Company License',
      },
      {
        id: 18,
        nameofLicense: 'Solar Contractor Company License',
      },
      { id: 19, nameofLicense: 'Others' },
    ];
    //},
    //error: (error) => {
    //}
    //});
  }

  selectedRowData: any;
  isDisabled: any = false;
  SettingClick(action: string, rowData: any): void {
    try {

      if (action === 'edit') {
        if (rowData && rowData.id) {
          // Store the selected row data
          this.selectedRowData = rowData;
          this.BankformData.patchValue(rowData);
          // Open the modal after populating the form
          this.modalService.open(this.addBankAccountModal, { centered: true, size: 'lg' })
            .result.then((result) => {
              console.log('Modal closed' + result);
            })
            .catch((res) => {
              console.log('Modal dismissed');
            });
        } else {
          console.error('Row data or its ID is undefined.');
        }
      } else if (action === 'delete') {
        Swal.fire({
          title: 'Do you want to delete Account record?',
          showCancelButton: true,
          confirmButtonText: 'Delete',
        }).then((result) => {
          if (result.isConfirmed) {
            this.companyService.deleteBankAccount(rowData.id).subscribe((res)=>{
              this.alert.showMessage(res.message);
              this.modalService.dismissAll();
              this.BankformData.reset();
              this.getCompany();
            });
          }
        });

      } else {
        console.error('Unsupported action:', action);
      }
    } catch (error) {
      console.error('Error in SettingClick:', error);
    }
  }

  selectedRowData1: any;
  SettingClick1(action: string, rowData: any): void {
    try {

      console.log('Row data:', rowData);
      if (action === 'edit') {
        if (rowData && rowData.id) {
          this.license = rowData;
          this.license.expirationDate=new Date(rowData.expirationDate).toISOString().substring(0, 10);
          this.license.issuedDate=new Date(rowData.issuedDate).toISOString().substring(0, 10);
          this.LicformData.patchValue( this.license);
          this.modalService.open(this.addlicenceModal, { centered: true, size: 'lg' })
            .result.then((result) => {
              console.log('Modal closed' + result);
            })
            .catch((res) => {
              console.log('Modal dismissed');
            });
          console.log('Editing license with ID:', rowData.id);
        } else {
          console.error('Row data or its ID is undefined.');
        }
      } else if (action === 'delete') {
        if (rowData && rowData.id) {
          Swal.fire({
            title: 'Do you want to Delete License?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
          }).then((result) => {
            if (result.isConfirmed) {
              this.companyService.deleteLicenseData(rowData.id).subscribe((res) => {
                this.alert.showMessage(res.message);
                this.modalService.dismissAll();
                this.LicformData.reset();
                this.getCompany();
              });
            }
          });
          console.log('Deleting license with ID:', rowData.id);
        } else {
          console.error('Row data or its ID is undefined.');
        }
      } else {
        console.error('Unsupported action:', action);
      }
    } catch (error) {
      console.error('Error in SettingClick1:', error);
    }
  }

  // Example method to update or patch the model
  updateModelWithEditedData(updatedData: any) {

    this.companyService.updateBankAccount(updatedData).subscribe((res) => {
      this.alert.showMessage(res.message);
      this.modalService.dismissAll();
      this.BankformData.reset();
      this.getCompany();
    });
  }

  updateModelWithLicenseEditedData(updatedData: any) {

    this.companyService.updateLicenseData(updatedData).subscribe((res) => {
      this.alert.showMessage(res.message);
      this.modalService.dismissAll();
      this.LicformData.reset();
      this.getCompany();
    });
  }


  getBankAccountById(Id) {
    const findRecord = this.company.bankAccount.find((account) => account.id === Id);
    if (findRecord) {

      // Assign properties individually from findRecord to bankAccountform
      this.bankAccountform.id = findRecord.id;
      this.bankAccountform.bankName = findRecord.bankName;
      this.bankAccountform.accountHolderName = findRecord.accountHolderName;
      this.bankAccountform.accountNumber = findRecord.accountNumber;
      this.bankAccountform.routingNumber=findRecord.routingNumber;
      // Assign more properties as needed

      this.modalService.open(this.addBankAccountModal, { centered: true, size: 'lg' })
        .result.then((result) => {
          console.log('Modal closed' + result);
        })
        .catch((res) => {});
    } else {
      // Reset bankAccountform if record is not found
      this.bankAccountform = new bankAccount();
    }
  }


  viewBankAccountById(Id, content: TemplateRef<any>) {

    this.isDisabled = true;
    this.BankformData.disable();

    // Find the bank account record by Id
    let findRecord = this.company.bankAccount.find((A) => A.id == Id);

    if (findRecord) {
        // If record found, populate form and open modal
        this.bankAccountform = findRecord;
        this.BankformData.patchValue(this.bankAccountform);

        this.modalService.open(content, { centered: true, size: 'lg' })
            .result.then((result) => {
                // Reset form on modal close
                this.BankformData.reset();
                this.BankformData.disable(); // Disable form after reset
                this.isDisabled = false; // Enable other interactions
            })
            .catch((res) => {
                // Handle modal dismissal
                this.BankformData.reset(); // Reset form on modal dismiss
                this.BankformData.disable(); // Disable form after reset
                this.isDisabled = false; // Enable other interactions
            });
    } else {
        // If record not found, initialize a new bank account form
        this.bankAccountform = new bankAccount();
    }
}


  viewLicById(Id, content: TemplateRef<any>) {

    this.isDisabled = true;
    this.LicformData.disable();
    let findrecord = this.CompanyLicenseList.find((A) => A.id == Id);
    console.log(this.CompanyLicenseList,'this.CompanyLicenseList')
    if (findrecord != undefined) {
      // this.getCities(this.company.license.stateId);
      // this.getZipCodes(this.company.license.city);
      this.license = findrecord;
      this.license.issuedDate=new Date(this.license.issuedDate).toISOString().substring(0, 10);
      this.license.expirationDate=new Date(this.license.expirationDate).toISOString().substring(0, 10);
      this.modalService
        .open(content, { centered: true, size: 'lg' })
        .result.then((result) => {
          console.log('Modal closed' + result);
        })
        .catch((res) => {});
      this.LicformData.disable();
    } else {
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
    let findrecord = this.CompanyLicenseList.find(
      (A) => A.id == id
    );
    if (findrecord != undefined) {
      this.getCities(findrecord.stateId);
      this.getZipCodes(findrecord.city);
      this.license = findrecord;
      this.modalService
        .open(content, { centered: true, size: 'lg' })
        .result.then((result) => {
          console.log('Modal closed' + result);
        })
        .catch((res) => {});
    } else {
      this.license = new License();
    }
  }

  deleteLicense(id) {

    Swal.fire({
      title: 'Do you want to delete this record?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.companyService.deleteLicenseData(id).subscribe((res)=>{
          this.alert.showMessage(res.message);
          this.modalService.dismissAll();
          this.LicformData.reset();
          this.getCompany();
        });
      }
    });
  }

  getLicName(value) {
    let findrecord = this.licenseList1.find((A) => A.id == value);
    if (findrecord != undefined) {
      return findrecord.nameofLicense;
    } else {
      return null;
    }
  }

  addLicense() {

    this.licAttachments.forEach((element) => {
      this.license.attachments.push(element);
  });
  console.log(this.license.attachments,'this.license.attachments')
   // this.user.indivisualLicense = this.license;
    if (!this.company.id) {
      this.licAttachments.forEach((element) => {
        this.license.attachments.push(element);
      });
      let record = this.CompanyLicenseList.findIndex(
        (A) => A.licenseType == this.license.licenseType
      );
      if (record == -1) {
        this.CompanyLicenseList.push(this.license);
        this.modalService.dismissAll();
      } else {
        this.CompanyLicenseList[record] = this.license;
        this.modalService.dismissAll();
      }
      this.license = new License();
      this.license.attachments = new Array();
      this.licAttachments = new Array();
      // this.storeid = 0;
    } else {
      this.saveLicense();
    }
  }

  getStatesChange(event) {
    let text = this.countries.find(
      (x) => x.id == event.target.value
    ).countryName;
    this.getStates(event.target.value);
    if (text == 'Australia') {
      this.dynamictext = 'Post Code';
    } else {
      this.dynamictext = 'Zip Code';
    }
  }

  getStatesChangeforMailing(event) {
    this.getStatesMailing(event.target.value);
  }

  formatSSN(event: any): void {
    const value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedValue = value.replace(
      /^(\d{3})(\d{2})?(\d{0,4})?$/,
      (_, p1, p2, p3) => {
        let result = `${p1}`;
        if (p2) result += `-${p2}`;
        if (p3) result += `-${p3}`;
        return result;
      }
    );
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
      error: (error) => {},
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
      error: (error) => {},
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
      error: (error) => {},
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
      error: (error) => {},
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
      error: (error) => {},
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
      error: (error) => {},
    });
  }

  getCities(value) {
    this._countryService.getCities(value).subscribe({
      next: (data: any[]) => {
        this.cities = data;
      },
      error: (error) => {},
    });
  }

  getZipCodesChange(event) {
    this.getZipCodes(event.target.value);
  }

  getZipCodes(value) {
    this._countryService.getZipCodes(value).subscribe({
      next: (data: any[]) => {
        this.zipCodes = data;
      },
      error: (error) => {},
    });
  }

  getIndustryTypes() {
    this.accountservice.getIndustryType().subscribe((res) => {
      this.industryType = res;
    });
  }

  getAllCountries() {
    this.countryService.getAllCountry().subscribe((res) => {
      this.countries = res;
    });
  }

  getBankAccount() {
    // this.companyService.getCompanyBankAccount().subscribe((res) => {
    //   if (res != null) this.bankAccount = res;
    // });
  }

  // saveCompany() {
  //   // if (this.bankAccountform.bankName == '' || this.bankAccountform.bankName == null || this.bankAccountform.bankName == undefined) {
  //   //   this.alert.showToasterWithTitle(
  //   //     'error',
  //   //     "Please add bankAccountform.",
  //   //     'error'
  //   //   );
  //   //   return;
  //   // }
  //   // if (this.license.licenseNo == '' || this.license.licenseNo == null || this.license.licenseNo == undefined) {
  //   //   this.alert.showToasterWithTitle(
  //   //     'error',
  //   //     "Please add licenseform.",
  //   //     'error'
  //   //   );
  //   //   return;
  //   // }

  //   // if (this.base64Image == '' || this.base64Image == null || this.base64Image == undefined) {
  //   // } else {
  //   //   this.company.image = this.base64Image;
  //   // }

  //   this.CompanyLicenseList.forEach(element => {
  //     element.id = "5931114f-de48-41da-877b-2677e5eb9288"
  //   });
  //   this.company.bankAccount = this.bankAccountform;
  //   this.company.license = this.CompanyLicenseList;
  //   if ($('#IsReport').is(':checked'))
  //     this.company.isReport = true;
  //   else
  //     this.company.isReport = false;
  //   if ($('#Invoices_Receipts').is(':checked'))
  //     this.company.invoices_Receipts = true;
  //   else
  //     this.company.invoices_Receipts = false;
  //   if ($('#IsEmails').is(':checked'))
  //     this.company.isEmails = true;
  //   else
  //     this.company.isEmails = false;

  //   this.companyService
  //     .updateCompany(this.company)
  //     .subscribe((res) => {
  //       this.alert.showToasterWithTitle(
  //         'success',
  //         "Company profile updated successfully.",
  //         'success'
  //       );
  //       //  this.ngOnInit();
  //     });
  // }
  updateNoOfEmpl($event) {
    console.log($event);
  }
  public saveCompany() {
    console.log(this.company,"company")
    this.client.serviceAddress = this.company.address || '';
  this.client.serviceCity = this.company.city || '';
  this.client.serviceState = this.company.state || '';
  this.client.serviceCountry = this.company.countryId || ''; // Adjust if necessary
  this.client.serviceAddressZipcodeId = this.company.zipCode || '';

  this.formData.patchValue({
    companyName:this.company.companyName,
    industryTypeId: this.company.industryTypeId,
    NumberOfEmployees:  this.company.numberofEmployees,
    url: this.company.websiteUrl,
    emailaddress: this.company.email,
    phoneNumber:  this.company.phoneNumber,
    taxRegistrationNumber: this.company.taxRegistrationNumber,
    Currency: this.company.currency,
    Address: this.company.address || '',
    MailingAddress: this.company.mailingAddress || '',
    City: this.company.city || '',
    State: this.company.state || '',
    mailingCity: this.company.mailingCity || '',
    mailingZipcode: this.company.mailingZipcode || '',
    MailingState: this.company.mailingState || '',
    ZipCode: this.company.zipCode || '',
    CountryId: this.company.countryId || null,
    MailingCountryId: this.company.mailingCountryId || null,
  });
    this.company.image = this.base64Image;


    this.CompanyLicenseList.forEach((element) => {
      element.id = '5931114f-de48-41da-877b-2677e5eb9288';
    });
    // this.company.bankAccount = this.bankAccountform;
    this.company.license = this.CompanyLicenseList;
    if ($('#IsReport').is(':checked')) this.company.isReport = true;
    else this.company.isReport = false;
    if ($('#Invoices_Receipts').is(':checked'))
      this.company.invoices_Receipts = true;
    else this.company.invoices_Receipts = false;
    if ($('#IsEmails').is(':checked')) this.company.isEmails = true;
    else this.company.isEmails = false;

    this.company.mailingAddress = this.client.serviceAddress;
    this.company.mailingCity = this.client.serviceCity;
    this.company.mailingState = this.client.serviceState;
    this.company.countryName = this.client.serviceCountry;
    this.company.mailingZipcode = this.client.serviceAddressZipcodeId;
    this.companyService.updateCompany(this.company).subscribe(
      (res) => {
          this.alert.showToasterWithTitle('success', 'Company profile updated successfully.', 'success');
      },
      (error) => {
          console.error("Error updating company:", error);
          console.error("Error details:", error.error);
          this.alert.showToasterWithTitle('error', 'Failed to update company profile.', 'error');
      }
  );

  }
  private logFormErrors() {
    Object.keys(this.formData.controls).forEach(key => {
        const control = this.formData.get(key);
        if (control && control.invalid) {
            console.error(`Control ${key} is invalid:`, control.errors);
        }
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
          'Invalid file type. Please select a PNG or JPG file.',
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
      this.base64Image = base64String.replace(
        'data:' + file.type + ';base64,',
        ''
      );
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
    const formattedNumber = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(
      3,
      6
    )}-${digitsOnly.slice(6)}`;
    this.company.phoneNumber = formattedNumber;
  }

  ChangeLicphonenumber(event: any) {
    // Extract digits from the entered phone number
    const input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    // Format the phone number as (XXX) XXX-XXXX
    const formattedNumber = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(
      3,
      6
    )}-${digitsOnly.slice(6)}`;
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

  handleBlob(blob: Blob): Observable<{ base64String: string; type: string }> {
    return new Observable(
      (observer: Observer<{ base64String: string; type: string }>) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result as string;
          const type = blob.type;

          observer.next({ base64String, type });
          observer.complete();
        };

        reader.onerror = (error) => {
          observer.error(error);
        };

        reader.readAsDataURL(blob);
      }
    );
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  setimag: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    // this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    // this.handleBlob(event.blob);
    this.handleBlob(event.blob).subscribe(
      ({ base64String, type }) => {
        this.base64Image = base64String;
        console.log('Base64 String:', base64String);
        console.log('Type:', type);
        // Do something with the Base64-encoded string and type
      },
      (error) => {
        console.error(error);
        // Handle the error
      }
    );
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
      this.ImageEditorInstance.theme = window.location.href
        .split('#')[1]
        .split('/')[1];
    }
  }

  public imageLoaded(): void {
    if (this.imgSrc === '') {
      const canvas: HTMLCanvasElement | null =
        document.querySelector('#img-canvas');
      const image: HTMLImageElement | null =
        document.querySelector('#demo-img');
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

      this.ImageEditorInstance.open(this.newimg ? this.newimg:this.company.image);
    }
  }

  public dialogClose(): void {
    const img: HTMLImageElement | null = document.querySelector('#demo-img');
    if (img) {
      this.ImageEditorInstance.open(img.src);
    }
  }

  // canvas click event
  public onOpenDialog(event: any): void {
    this.DialogInstance.show();
  }

  public imageChanged(args: any): void {
    const inputElement = document.getElementById(
      'img-upload'
    ) as HTMLInputElement | null;

    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        // 'reader.result' contains the base64 representation of the uploaded image
        this.company.image = reader.result as string;
        this.ImageEditorInstance.open(this.company.image);

        // Do any other processing with the base64 image if needed
        console.log('Base64 Image:', this.company.image);
        // this.newimg = this.company.image.replace("data:" + file.type + ";base64,", '');
        this.newimg = this.company.image;
      };

      // Read the image as a data URL
      reader.readAsDataURL(file);
    }
  }

  newimg = '';
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
    const canvas: HTMLCanvasElement | null =
      document.querySelector('#img-canvas');
    const ctx: CanvasRenderingContext2D | null = canvas?.getContext('2d')!; // Non-null assertion
    const parentDiv: HTMLElement | null = document.querySelector('.e-profile');
    if (canvas && ctx && parentDiv) {
      // Null check added
      const tempCanvas: HTMLCanvasElement = parentDiv.appendChild(
        createElement('canvas') as HTMLCanvasElement
      );
      const tempContext: CanvasRenderingContext2D =
        tempCanvas.getContext('2d')!;
      tempCanvas.width = croppedData.width;
      tempCanvas.height = croppedData.height;
      tempContext.putImageData(croppedData, 0, 0);
      this.base64Image = tempCanvas.toDataURL('image/png');
      // console.log('Cropped Base64 Image:', croppedBase64);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
      tempCanvas.remove();
      parentDiv.style.borderRadius = '100%';
      canvas.style.backgroundColor = '#fff';
      this.DialogInstance.hide();
      if (this.imgSrc !== '') {
        const img: HTMLImageElement | null =
          document.querySelector('#demo-img');
        if (img) {
          img.src = this.imgSrc;
        }
      }
    }
  }

  cropping() {}

  public dlgButtons: ButtonPropsModel[] = [
    {
      click: this.dlgOpenButtonClick.bind(this),
      buttonModel: {
        content: 'Open',
        isPrimary: false,
        cssClass: 'e-custom-img-btn e-img-custom-open',
      },
    },
    {
      click: this.dlgResetBtnClick.bind(this),
      buttonModel: {
        content: 'Reset',
        isPrimary: false,
        cssClass: 'e-custom-img-btn e-img-custom-reset',
      },
    },
    // {
    //   click: this.dlgRotateBtnClick.bind(this),
    //   buttonModel: {
    //     content: 'Rotate',
    //     isPrimary: false,
    //     cssClass: 'e-custom-img-btn e-img-custom-rotate',
    //   },
    // },
    {
      click: this.dlgDoneBtnClick.bind(this),
      buttonModel: {
        content: 'Apply',
        isPrimary: true,
        cssClass: 'e-custom-img-btn e-img-custom-apply',
      },
    },
  ];

  public canvasClicked(): void {
    this.DialogInstance.show();
  }

  ngAfterViewInit(): void {
    const inputElements = this.el.nativeElement.querySelectorAll('.otp-input');
    console.log(inputElements); // Check if the input elements are correctly obtained

    // Now, you can iterate over the inputElements and work with them as needed
    inputElements.forEach((input: HTMLInputElement, index: number) => {
        // Work with each input element here
        console.log(input);
    });
    this.initMapService();
    this.initMapOffice();
    let imageHide =
      this.el.nativeElement.getElementsByClassName('sb-desktop-wrapper')[0];

    if (imageHide) {
      this.renderer.listen(imageHide, 'click', (args: any): void => {
        if (
          args.target.className.indexOf('col-lg-12 control-section') > -1 ||
          args.target.className.indexOf('sb-content') > -1
        ) {
          this.DialogInstance.hide();
        }
      });
    }
  }
  initMapService() {

    this.mapService = new google.maps.Map(this.mapElement2.nativeElement, {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 8,
      mapTypeId: 'roadmap',
    });

    const map = this.mapService;

    // Create the search box and link it to the UI element.
    const input = this.mapSearchService?.nativeElement;

    const searchBox = new google.maps.places.SearchBox(input);

    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);

    });

    let markers: google.maps.Marker[] = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', () => {

      const places = searchBox.getPlaces();
      this.client.serviceAddress=places[0].formatted_address;
      if (places.length == 0) {
        return;
      }
      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          this.alert.showToaster(
            'Returned place contains no geometry',
            'error'
          );
          return;
        }

        if (this.marker) {
          this.marker.setPosition(place.geometry.location);
          this.client.longitudeService = place.geometry.location
            .lng()
            .toString();
          this.client.latitudeService = place.geometry.location
            .lat()
            .toString();
        } else {
          this.marker = new google.maps.Marker({
            map,
            title: place.name,
            position: place.geometry.location,
          });
        }
        this.client.serviceAddress = '';
        this.client.serviceCity = '';
        this.client.serviceAddressZipcodeId = '';
        this.client.serviceCity = '';
        this.client.serviceCountry = '';
        this.client.serviceState = '';

        var address = place.name;

        this.isLoading = true;
        place.address_components.map((x) => {
          if (x.types[0] == 'route') {
            address += ` , ${x.long_name}`;
          } else if (x.types[0] == 'sublocality_level_2') {
            address += ` , ${x.long_name}`;
          } else if (x.types[0] == 'sublocality_level_1') {
            address += ` , ${x.long_name}`;
          } else if (x.types[0] == 'locality') {
            this.client.serviceCity = x.long_name;
          } else if (x.types[0] == 'postal_code') {
            this.client.serviceAddressZipcodeId = x.long_name;
          } else if (x.types[0] == 'administrative_area_level_1') {
            this.client.serviceState = x.long_name;
          } else if (x.types[0] == 'country') {
            this.client.serviceCountry = x.long_name;
          }
          this.client.serviceAddress = address;
        });
        this.isLoading = false;

        this.client.longitudeService = place.geometry.location.lng().toString();
        this.client.latitudeService = place.geometry.location.lat().toString();

        // Create a marker for each place.

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }

  initMapOffice() {
    this.isLoading = true;
    this.mapBilling = new google.maps.Map(this.mapElement?.nativeElement, {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 8,
      mapTypeId: 'roadmap',
    });

    const map = this.mapBilling;
    // Create the search box and link it to the UI element.
    const input = this.mapSearch?.nativeElement;
    const searchBox = new google.maps.places.SearchBox(input);

    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log('Returned place contains no geometry');
          return;
        }

        const icon = {
          url: place.icon as string,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        if (this.marker2) {
          this.marker2.setPosition(place.geometry.location);
          this.client.longitudeOffice = place.geometry.location
            .lng()
            .toString();
          this.client.latitudeOffice = place.geometry.location.lat().toString();
        } else {
          this.marker2 = new google.maps.Marker({
            map,
            title: place.name,
            position: place.geometry.location,
          });
        }
        this.client.officeAddress = '';
        this.client.billingCity = '';
        this.client.billingCountry = '';
        this.client.billingState = '';
        this.client.zipCodeID = '';

        var address = place.name;
        place.address_components.map((x) => {
          if (x.types[0] == 'route') {
            address += ` , ${x.long_name}`;
          } else if (x.types[0] == 'sublocality_level_2') {
            address += ` , ${x.long_name}`;
          } else if (x.types[0] == 'sublocality_level_1') {
            address += ` , ${x.long_name}`;
          } else if (x.types[0] == 'locality') {
            this.client.billingCity = x.long_name;
          } else if (x.types[0] == 'postal_code') {
            this.client.zipCodeID = x.long_name;
            console.log(this.client.zipCodeID);
          } else if (x.types[0] == 'administrative_area_level_1') {
            this.client.billingState = x.long_name;
          } else if (x.types[0] == 'country') {
            this.client.billingCountry = x.long_name;
          }
          this.client.officeAddress = address;
        });
        this.client.longitudeOffice = place.geometry.location.lng().toString();
        this.client.latitudeOffice = place.geometry.location.lat().toString();

        // Create a marker for each place.

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
    this.isLoading = false;
  }

  saveBankAccount() {

    if (this.selectedRowData && this.selectedRowData.id) {
      // Editing existing bank account
      const accountData = this.BankformData.value;
      this.selectedRowData.accountHolderName=accountData.accountHolderName;
      this.selectedRowData.accountNumber=accountData.accountNumber;
      this.selectedRowData.routingNumber=accountData.routingNumber;
      this.selectedRowData.bankName=accountData.bankName;
      this.updateModelWithEditedData(this.selectedRowData);
    } else {
      // Adding new bank account
      if (this.BankformData.valid) {
        const accountDetailsData = this.BankformData.value;
        this.companyService.addBankAccount(accountDetailsData).subscribe((res) => {
                  this.alert.showMessage(res.message);
                  this.modalService.dismissAll();
                  this,this.BankformData.reset();
                  this.getCompany();
               });
      }
    }
  }

  saveLicense() {

    if (this.license && this.license.id) {
      // Editing existing bank account
      const licenseData = this.LicformData.value;
      this.license.licenseType=licenseData.licenseType;
      this.license.licenseNo=licenseData.licenseNo;
      this.license.name=licenseData.name;
      this.license.issuedByAuthority=licenseData.issuedByAuthority;
      this.license.socialSecurityNumber=licenseData.socialSecurityNumber;
      this.license.issuedDate=licenseData.issuedDate;
      this.license.expirationDate=licenseData.expirationDate;
      this.updateModelWithLicenseEditedData(this.license);
    }
    else {
      this.bankAccountform.companyId = this.company.id;
      this.companyService.addLicense(this.license).subscribe((res) => {
        console.log(this.license,'this.license')
        this.getCompany();
        this.alert.showMessage(res.message);
        this.LicformData.reset();
        this.modalService.dismissAll();
      });
    }
  }

  sendTwoFactorOtp() {
    var two_factorenabled =Boolean(JSON.parse(sessionStorage.getItem('current_user')));
    var current_user = JSON.parse(sessionStorage.getItem('current_user'));
    console.log(current_user, 'current_user');
    if (two_factorenabled) {
      this.authservice.getProfileUpdateOtp(current_user.userName).subscribe(res => {
        this.alert.showToasterWithTitle('An One Time Password ( OTP) has been sent to your email address ' + current_user.email,'','success');
        if (res.showOtpBox) {
          this.openOtpCenteredModal(this.otpModal);
        }
      });
    } else {
      this.editmode = !this.editmode;
    }
  }

  openOtpCenteredModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, { centered: true, size: 'md' })
      .result.then((result) => {
        console.log('Modal closed' + result);
      })
      .catch((res) => {

      });
  }
  VerifyProfileChangeOtp() {
    // Get the values of all input boxes
    const otpValue = Object.values(this.otpInput.value).join('');
    console.log(otpValue,'otpvalue');

    // Now you can use otpValue to verify the OTP
    var current_user = JSON.parse(sessionStorage.getItem('current_user'));

    this.accountservice.VerifyProfileChangeOtp({
      'userName': current_user.userName,
      'password': '',
      'isSocial': false,
      'otp': otpValue // Use otpValue here
    }).subscribe(
        (res) => {
            console.log(res,'res');
            this.editmode = res.showOtpBox;
            this.alert.showToasterWithTitle('Verify Password', res.message, 'info');

            if (res.showOtpBox) {
                this.modalService.dismissAll();
            }
        },
        (error) => {
            console.error(error);
            this.alert.showToasterWithTitle('Error', 'An error occurred while verifying OTP. Please try again.', 'error');
        }
    );
}



moveToNext(event: KeyboardEvent, prevInput: HTMLInputElement | null) {
  const target = event.target as HTMLInputElement;
  const keyCode = event.keyCode;

  // Handle backspace key
  if (keyCode === 8 && target.value.length === 0) {
    const prevInput = target.previousElementSibling as HTMLInputElement;
    if (prevInput) {
      prevInput.focus();
      prevInput.value = '';
    }
    event.preventDefault();
    return;
  }

  // Handle arrow keys
  if (keyCode === 37) {
    const prevInput = target.previousElementSibling as HTMLInputElement;
    if (prevInput) {
      prevInput.focus();
    }
  } else if (keyCode === 39) {
    const nextInput = target.nextElementSibling as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    }
  } else if (target.value.length === 1) {
    const nextInput = target.nextElementSibling as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    }
  }
}




handlePaste(event: ClipboardEvent) {
  const pastedText = event.clipboardData?.getData('text/plain');

  if (pastedText && pastedText.length === 6) {
    this.otpInput.patchValue({
      otp1: pastedText.charAt(0),
      otp2: pastedText.charAt(1),
      otp3: pastedText.charAt(2),
      otp4: pastedText.charAt(3),
      otp5: pastedText.charAt(4),
      otp6: pastedText.charAt(5)
    });

    // Delay focusing on the last input box to ensure all inputs are populated
    setTimeout(() => {
      const inputs = document.getElementsByClassName('otp-input');
      const lastInput = inputs[inputs.length - 1] as HTMLInputElement;
      lastInput.focus();
    }, 50);
  }
}

restrictToDigits(event: KeyboardEvent) {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}
}
