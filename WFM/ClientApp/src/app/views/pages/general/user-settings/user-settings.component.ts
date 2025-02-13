import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { UserService } from '../services/user.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/views/services/auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef; // Get reference to file input
  croppedImage: any = ''; // Holds the base64 image for preview
  selectedFile: File | null = null; // Holds the actual file


  userForm!: FormGroup;
  emailForm!: FormGroup;
  passwordForm!: FormGroup;
  workspaceForm!: FormGroup;

  industries: any[] = [];
  jobTitles: any[] = [];
  notificationSettings: any[] = [];
  currentEmail: string = '';

  base64Image: any = "";
  show:any=false
  // croppedImage: any = "";

  @ViewChild('grid') public grid!: GridComponent;
  public toolbarOptions: string[] = ['Search'];

  workspaceNameLength: number = 0;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public authService: AuthService,

  ) {}

  ngOnInit(): void {
    this.initializeForms();
    this.loadUserData();
  }

  private initializeForms() {
    this.userForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      industry: [null, Validators.required],
      jobTitle: [null, Validators.required],
      phoneNumber: ['', Validators.pattern('^[0-9]+$')],
    });

    this.emailForm = this.fb.group({
      newEmail: ['', [Validators.required, Validators.email]],
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.workspaceForm = this.fb.group({
      workspaceId: [{ value: '', disabled: true }],
      workspaceName: ['', [Validators.required, Validators.maxLength(40)]],
    });
  }

  private loadUserData() {
    forkJoin({
      // industries: this.userService.industryList(),
      // jobTitles: this.userService.jobTitleList(),
      userProfile: this.userService.userGetProfile(),
      notifications: this.userService.getNotifications(),
      email: this.userService.getEmail(),
      workspace: this.userService.getWorkspace(),
    }).subscribe(
      ({
        // industries, jobTitles,
        userProfile, notifications, email, workspace }) => {
        // this.industries = industries;
        // this.jobTitles = jobTitles;
        this.notificationSettings = notifications;
        this.currentEmail = email.email;
        // this.userService.sharedEmailIdSubject.next(email.email)
        this.userForm.patchValue({
          id: userProfile.id,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          industry: userProfile.industry,
          jobTitle: userProfile.jobTitle,
          phoneNumber: userProfile.phoneNumber,
        });
        this.croppedImage=`${environment.baseUrl}${userProfile.profileImage}`
        this.show=true
        // this.share.updateTitle(this.croppedImage)
        this.workspaceForm.patchValue({
          workspaceId: workspace.id,
          workspaceName: workspace.name,
        });
      },
      (error) => this.showError('Failed to load user data')
    );
  }
  openFileSelector(): void {
    this.fileInput.nativeElement.click();
  }

  fileChangeEvent(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      console.log(formData,'formData');
      this.userService.uploadImage(formData).subscribe(res=>{
        console.log(res,'upload img');
        if(res){
        this.show=false
        this.croppedImage=''
          this.userService.userGetProfile().subscribe(userProfile=>{
            this.userForm.patchValue({
              id: userProfile.id,
              firstName: userProfile.firstName,
              lastName: userProfile.lastName,
              industry: userProfile.industry,
              jobTitle: userProfile.jobTitle,
              phoneNumber: userProfile.phoneNumber,
            });
            this.croppedImage=`${environment.baseUrl}${userProfile.profileImage}`
        this.show=true
            console.log(this.croppedImage,'this.croppedImage');
            this.userService.setProfile(this.croppedImage)
            // this.share.updateTitle(this.croppedImage)

          })
        }
      })
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        // this.croppedImage = reader.result; // Display the selected image immediately
        // console.log(this.croppedImage,'this.croppedImage ');

        this.base64Image = base64String.replace("data:" + file.type + ";base64,", '');
      };
      console.log(file,'file');
      console.log(reader.readAsDataURL(file),'reader.readAsDataURL(file)');

      reader.readAsDataURL(file);
    }
  }


  updateDetails() {
    if (this.userForm.valid) {
      this.userService.userUpdateProfile(this.userForm.getRawValue()).subscribe({
        next: () => this.showSuccess('Profile updated successfully'),
        error: () => this.showError('Failed to update profile'),
      });
    }
  }

  updateEmail() {
    if (this.emailForm.valid) {
      this.userService.updateEmail(this.emailForm.value).subscribe({
        next: () => {
          this.showSuccess('Email updated successfully');
          this.userService.getEmail().subscribe((res) => {
            this.currentEmail = res.email;
            this.userService.setEmail(res.email)
            this.emailForm.reset();
          });
        },
        error: () => this.showError('Failed to update email'),
      });
    } else {
      this.showValidationError();
    }
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      this.userService.updatePassword(this.passwordForm.value).subscribe({
        next: () => {
          this.showSuccess('Password updated successfully');
          this.passwordForm.reset();
        },
        error: () => this.showError('Failed to update password'),
      });
    } else {
      this.showValidationError();
    }
  }

  updateCharacterCount() {
    this.workspaceNameLength = this.workspaceForm.get('workspaceName')?.value.length || 0;
  }

  toggleNotification(user: any) {
    user.isNotificationEnabled = !user.isNotificationEnabled;
    console.log(`Notification for ${user.email}: ${user.isNotificationEnabled ? 'Enabled' : 'Disabled'}`);
  }

  private showSuccess(message: string) {
    Swal.fire({ icon: 'success', title: 'Success!', text: message, confirmButtonColor: '#3085d6' });
  }

  private showError(message: string) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: message, confirmButtonColor: '#d33' });
  }

  private showValidationError() {
    Swal.fire({
      icon: 'warning',
      title: 'Validation Error',
      text: 'Please fill in the form correctly before submitting.',
      confirmButtonColor: '#f39c12',
    });
  }
}
