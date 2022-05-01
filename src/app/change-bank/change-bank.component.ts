import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankAccountDetails } from '../bank-account-details';
import { BankService } from '../bank.service';
import { UserManager } from '../user-manager';


@Component({
  selector: 'app-change-bank',
  templateUrl: './change-bank.component.html',
  styleUrls: ['./change-bank.component.css']
})
export class ChangeBankComponent implements OnInit {

  bankDetails: BankAccountDetails;
  branchName: string;
  branchNum: number;
  accNum: number;

  constructor(private bnk_srv: BankService, private router_srv: Router) {
    this.bankDetails = bnk_srv.getBankDetails();
    this.branchName = this.bankDetails.branchName;
    this.branchNum = this.bankDetails.branchNumber;
    this.accNum = this.bankDetails.accountNumber;
  }

  ngOnInit(): void {
    
    if (!UserManager.isUserSignedIn()){
      alert("user not singend in");
      this.router_srv.navigateByUrl('/AccountLogin');
    }
    
  }


  cancel(): void {
    this.bankDetails = this.bnk_srv.getBankDetails();
    this.branchName = this.bankDetails.branchName;
    this.branchNum = this.bankDetails.branchNumber;
    this.accNum = this.bankDetails.accountNumber;
  }


  save(): void {
    if (this.branchName == "") {
      alert("שם סניף חובה");
      document.getElementById("brName")?.focus();
      return;
    }
    else if (!this.branchNum) {
      alert("מס סניף חובה");
      document.getElementById("brNum")?.focus();
      return;
    }
    else if (this.accNum == 0) {
      alert("מס בעל החשבון חובה");
      document.getElementById("accNum")?.focus();
      return;
    }
    this.bnk_srv.updateBankDetails(this.branchName, this.branchNum, this.accNum);

  }




}
