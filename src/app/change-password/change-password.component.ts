import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserManager } from '../user-manager';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  crntPwd: string = "";
  nwPwd: string = "";
  nw2Pwd: string = "";
  jobDone: boolean = false;
  constructor(private router_srv: Router) { }

  ngOnInit(): void { 
    if (!UserManager.isUserSignedIn()){
      this.router_srv.navigateByUrl('/AccountLogin');
    }   
  }

  back(){
    this.router_srv.navigateByUrl('/BankAccount');
  }
  updIt() {
    this.jobDone = false;
    if (this.crntPwd.trim() == "" || this.nwPwd.trim() == "" || this.nw2Pwd.trim() == "") {
      alert("אחד או יותר משדות הסיסמא ריק");
      return;
    }
    if (!UserManager.isPwdOk(this.crntPwd.trim())) {
      alert("סיסמא נוכחית שגויה");
      return;
    }
    if ((this.nwPwd.trim() != this.nw2Pwd.trim())) {
      alert(" סיסמא מבוקשת ווידואה חייבות להיות זהות");
      return;
    }
    if ((this.crntPwd.trim() == this.nwPwd.trim())) {
      alert(" סיסמא מבוקשת  חייבת להיות שונה מנוכחית");
      return;
    }
    this.jobDone = true;
    UserManager.changePwd(this.nwPwd.trim());
  }
}
