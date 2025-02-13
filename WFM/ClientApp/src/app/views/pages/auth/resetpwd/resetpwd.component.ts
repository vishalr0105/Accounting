import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { map, of } from 'rxjs';
import { AccountService } from 'src/app/views/services/account.service';
import { AlertService } from 'src/app/views/services/alert.service';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.scss']
})
export class ResetpwdComponent implements OnInit {

  resetpwdform:FormGroup;
  resetpwdcode:string;

  constructor(public fb:FormBuilder,private accountservice:AccountService,private alertservice:AlertService,
                private activatedroute:ActivatedRoute

  ) {
    this.createForm();
  }
  ngOnInit(): void {


    this.activatedroute.queryParams.pipe(map(m=>this.resetpwdcode=m.resetpwdcode)).subscribe();
  }
  createForm(){
    this.resetpwdform=this.fb.group({
      'newPwd':new FormControl('',[Validators.required, Validators.minLength(8)]),
      'confirmPwd':new FormControl('',Validators.required),
      'resetPwdCode':new FormControl(''),
    },{ validators: confirmPasswordValidator })
  }
  ResetPwd() {
    this.resetpwdform.controls['resetPwdCode'].setValue(this.resetpwdcode);
    console.log(this.resetpwdform.value);

    this.accountservice.updatePwd(this.resetpwdform.value).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.alertservice.showToasterWithTitle('Password Updated', res.message, 'success');
        } else {
          this.alertservice.showToasterWithTitle('Error', res.message, 'error');
        }
      },
      error: (error: any) => {
        console.error("Error updating password:", error);
        this.alertservice.showToasterWithTitle('Error', 'Invalid or expired reset password code.!', 'error');
      }
    });
  }

}
export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.newPwd === control.value.confirmPwd
    ? null
    : { PasswordNoMatch: true };
};
