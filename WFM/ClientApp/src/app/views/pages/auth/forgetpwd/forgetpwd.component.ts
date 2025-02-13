import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/views/services/account.service';
import { AlertService } from 'src/app/views/services/alert.service';

@Component({
  selector: 'app-forgetpwd',
  templateUrl: './forgetpwd.component.html',
  styleUrls: ['./forgetpwd.component.scss']
})
export class ForgetpwdComponent implements OnInit {

  forgetPwdForm:FormGroup;
  constructor(public fb:FormBuilder,private accountservice:AccountService,public alertservice:AlertService) {
    this.createForm();
  }

  ngOnInit(): void {
  }
  createForm(){
    this.forgetPwdForm=this.fb.group({
      email:new FormControl('',[Validators.required,Validators.email]),
    })
  }
  sendResetPwdLink(){
    this.accountservice.sendResetPwdLink(this.forgetPwdForm.controls['email'].value).subscribe(res=>{
      if(res.status==200){
        this.alertservice.showToasterWithTitle('Success',res.message,'success');
      }
      else{
        this.alertservice.showToasterWithTitle('Error',res.message,'error');
      }
    })
  }


}


