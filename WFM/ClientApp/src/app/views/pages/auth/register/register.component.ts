import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AccountService } from 'src/app/views/services/account.service';

import { UserService } from '../../general/services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  userForm: FormGroup;

  industries: any[] = [];
  jobTitles: any[] = [];

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router, private userService: UserService) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      role: ['', [Validators.required]],
      jobTitle: [''],
      industry: [''],
      phoneNumber: ['']

    }, { validator: this.passwordsMatchValidator }); // Add the custom validator here
  }

  ngOnInit(): void {
    forkJoin({
      industries: this.userService.industryList(),
      jobTitles: this.userService.jobTitleList(),

    }).subscribe(
      ({ industries, jobTitles, }) => {
        this.industries = industries;
        this.jobTitles = jobTitles;
      },
      (error) => console.log(error)
    );
  }

  // Custom validator to check if password and confirmPassword are the same
  passwordsMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted:', this.userForm.value);
      this.accountService.registerUser(this.userForm.value).subscribe(
        res => {
          console.log(res, 'res');
          if (res.message) {
            localStorage.setItem('currentUserId', res.currentUserId);
            localStorage.setItem('userName', res.userName);
            localStorage.setItem('isLoggedin', 'true');
            window.location.href = "/admin"
          }
        }
      )
      // Handle form submission logic
    } else {
      console.log('Form is invalid');
    }
  }
}
