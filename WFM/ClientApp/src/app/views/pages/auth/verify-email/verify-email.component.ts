import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/views/services/account.service';
import { AlertService, MessageSeverity } from 'src/app/views/services/alert.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  isSuccess: boolean = false;
  hasError: boolean = false;
  errorMsg: string = "";
  _email: string;
  constructor(private route: ActivatedRoute,
    private accountService: AccountService,
    private alert: AlertService,
    private _router: Router) {

    this._email = localStorage.getItem("newUserEmail");
  }

  ngOnInit(): void {
    this.isSuccess = false;
    this.hasError = false;
    if (this.route.snapshot.params.id) {

      this.accountService.verifyEmail(this.route.snapshot.params.id).subscribe({
        next: (data: any) => {
          console.log(JSON.stringify(data));
          if (data.errorMessage) {
            this.hasError = true;
            this.errorMsg = data.errorMessage;
          } else {
            this.isSuccess = true;
            setTimeout(() => {
              const userId = this.route.snapshot.params.id;
              this._router.navigate(['/auth/login']);
            }, 5000);
          }
        },
        error: error => {
          this.hasError = true;
          this.alert.showMessage(`${error.status}`, error.error, MessageSeverity.error);
        }
      });
    } else {
    }
  }

}
