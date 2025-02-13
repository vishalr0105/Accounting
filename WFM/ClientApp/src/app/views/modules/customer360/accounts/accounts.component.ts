import { Router } from '@angular/router';
import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  AlertService,
  MessageSeverity,
} from 'src/app/views/services/alert.service';
import { Customer360Service } from 'src/app/views/services/customer360.service';
import { Account, AccountDto } from 'src/app/views/models/Customer.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import {
  SelectionSettingsModel,
  ToolbarItems,
} from '@syncfusion/ej2-angular-grids';
import { CompanyService } from 'src/app/views/services/company.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ProgressbarService } from 'src/app/views/services/progressbar.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  animations: [
    trigger('indicatorAnimation', [
      state('normal', style({
        height: '20px',  // set to your initial height
        transform: 'translateY(0)'
      })),
      state('expanded', style({
        height: '30px',  // set to your desired height when clicked
        transform: 'translateY(-10px)'
      })),
      transition('normal <=> expanded', [
         animate('0.0s ease-in-out')
      ])
    ])
  ]
})
export class AccountsComponent implements OnInit {
  @ViewChild('xlModal123') modelTemplate: TemplateRef<any>;
  @ViewChild('clientForm') clientForm: NgForm;
  @ViewChild('contectForm') contectForm: NgForm;
  @ViewChild('xlModal') xlModal;
  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef;
  address: string = ''; // Input field for address
  map: google.maps.Map;
  fieldsAndHeaders: { field: string; header: string }[] = [];
  indicatorState: { [key: string]: string } = {};
  public toolbarOptions?: ToolbarItems[];
  public selectionOptions?: SelectionSettingsModel;
  selectedAccount: AccountDto = new AccountDto();
  accountDto: AccountDto[] = [];
  noOfActiveClients = 0;
  noOfInActiveClients = 0;
  noOfRegisteredClients = 0;
  totalClients = 0;
  ColumnMode = ColumnMode;
  clients: Account[] = [];
  filteredTableData = [];
  tableData = [];
  loadingIndicator = true;
  selectedRows = [];
  constructor(
    private customer360Service: Customer360Service,
    private alert: AlertService,
    private modalService: NgbModal,
    private router: Router,
    private companyService: CompanyService,
    private pgbservice:ProgressbarService,
  ) {}
  ngAfterViewInit(): void {
    if (this.mapContainer) {
      this.loadMap();
    }
  }
  ngOnInit(): void {
    this.pgbservice.showprogress=true;
    this.getAllClient();
    this.getCompany();
  }
  loadMap() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    // Initialize the map
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }
  getAllClient() {
    this.clients = [];
    this.totalClients = 0;
    this.noOfActiveClients = 0;
    this.noOfInActiveClients = 0;
    this.customer360Service.getAccountAndContacts().subscribe({
      next: (data: AccountDto[]) => {
        console.log(data);
        this.accountDto = data;
        data.map((x) => {
          this.clients.push(x.account);
        });
        var models = [];
        this.clients.map((x) => {
          this.totalClients++;
          if (x.activityStatus == 'Active') {
            this.noOfActiveClients++;
          } else if(x.activityStatus == 'InActive') {
            this.noOfInActiveClients++;
          }
          var updatedAt = new Date(x.updatedAt).toLocaleString();
          var model = {
            id: x.id,
            company: x.accountName,
            status: x.activityStatus,
            location: x.officeAddress,
            'primary Contact': x.companyPhoneNo,
            'last Changed': updatedAt,
            IsSelected: false,
          };
          models.push(model);
          this.loadingIndicator = false;
        });
        this.tableData = models;
        this.filteredTableData = [...this.tableData];
        this.fieldsAndHeaders = [
          { field: 'company', header: 'Company' },
          { field: 'status', header: 'Status' },
          { field: 'location', header: 'Location' },
          { field: 'primary Contact', header: 'Primary Contact' },
          { field: 'last Changed', header: 'Last Changed' },
        ];
        console.log(this.tableData, 'tabledata');
        this.tableData.forEach((element) => {
          if (element.location) {
            this.addAddress(element.location);
          }
        });
        this.pgbservice.showprogress=false;
      },
      error: (error) => {
        this.pgbservice.showprogress=false;
        this.alert.showMessage(`${error.status}`, '', MessageSeverity.error);
      },
    });
  }
  filterByStatus(status: string) {
    Object.keys(this.indicatorState).forEach(key => {
      this.indicatorState[key] = 'normal';
  });
   // Set the clicked status to 'expanded' or keep it normal
   if (status) {
    this.indicatorState[status] = 'expanded';
} else {
    this.indicatorState[''] = 'expanded'; // Add this line
}
    if (status) {
      this.filteredTableData = this.tableData.filter(contact => contact.status === status);
    } else {
      this.filteredTableData = [...this.tableData]; // Reset to original data if needed
    }
  }
  view(id)
  {
    this.router.navigate(['/admin/customer360/accountdetails', id]);
  }
  edit(id) {
    this.router.navigate(['/admin/customer360/account/edit', id]);
  }
  deleteByID(id) {
    this.customer360Service.deleteAccount(id).subscribe({
      next: () => {
        this.alert.showToaster('Account Deleted Successfully', 'success');
      },
      error: () => {
        this.alert.showToaster('Something went wrong', 'error');
      },
    });
  }
  deleteList(list) {
    var selectedIDs: any[] = list;
    var count = 0;
    selectedIDs.forEach((x, i) => {
      this.customer360Service.deleteAccount(selectedIDs[i].id).subscribe({
        next: () => {
          count++;
          if (count == selectedIDs.length) {
            this.alert.showToaster('Accounts Deleted Successfully', 'success');
          }
        },
        error: () => {
          this.alert.showToaster('Something went wrong', 'error');
        },
      });
    });
  }
  timeLine = [];
  openModel(id, content) {
    var data = this.accountDto.filter((x) => x.account.id == id)[0];
    this.selectedAccount = data;
    this.customer360Service
      .getAccountLog(this.selectedAccount.account.id)
      .subscribe((data: any[]) => {
        this.timeLine = data;
        this.modalService
          .open(content, { size: 'xl', scrollable: true })
          .result.then(() => {})
          .catch(() => {
          });
      });
  }
  getCompany() {
    this.companyService.getCompany().subscribe((res) => {
      console.log(res.mailingAddress, 'this.company.mailingAddress');
      if (res.mailingAddress) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: res.mailingAddress }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const location = results[0].geometry.location;
            // Get latitude and longitude from the location object
            this.map.setCenter(location);
            const icon = {
              url: '../../../../../assets/images/others/isometric-building-icon-vector-7431001-removebg-preview.png', // Specify the path to your building icon
              scaledSize: new google.maps.Size(50, 50), // Adjust the size as needed
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(25, 50), // Adjust the anchor point if necessary
            };
            new google.maps.Marker({
              position: location,
              map: this.map,
              icon: icon, // Use the custom icon
            });
          } else {
            console.error(
              'Geocode was not successful for the following reason: ' + status
            );
          }
        });
      }
    });
  }
  addAddress(address) {
    // this.address = this.form.controls['address'].value;
    if (address) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const location = results[0].geometry.location;
          // Get latitude and longitude from the location object
          this.map.setCenter(location);
          const icon = {
            url: '../../../../../assets/images/others/images-removebg-preview.png', // Specify the path to your home icon image
            scaledSize: new google.maps.Size(40, 40), // Adjust the size as needed
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(20, 40), // Adjust anchor point if needed
          };
          new google.maps.Marker({
            position: location,
            map: this.map,
            icon: icon, // Use the custom icon
          });
        } else {
          console.error(
            'Geocode was not successful for the following reason: ' + status
          );
        }
      });
    }
  }
}
