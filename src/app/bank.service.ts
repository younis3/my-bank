import { Injectable } from '@angular/core';
import { BankAccountDetails } from './bank-account-details';

const BANK_DETAILS_KY: string = "BANK_DETAILS";

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private theBankAccountDetails = new BankAccountDetails("Rimonim Givataim", 762, 113344);

  constructor() {
    if (localStorage.getItem(BANK_DETAILS_KY) != null) {
      try {
        this.theBankAccountDetails = JSON.parse(localStorage.getItem(BANK_DETAILS_KY)||'{}');
      }
      catch (err) {
        localStorage.setItem(BANK_DETAILS_KY, JSON.stringify(this.theBankAccountDetails));
        console.log("JSON Problem: " + err);
      }
    }
    else {
      localStorage.setItem(BANK_DETAILS_KY, JSON.stringify(this.theBankAccountDetails));
    }
  }

  public getBankDetails(): BankAccountDetails {
    return this.theBankAccountDetails;
  }

  public bankDtlsToString(): string {
    let str = `${this.theBankAccountDetails.bankName} Branch: (${this.theBankAccountDetails.branchNumber})
     ${this.theBankAccountDetails.branchName} Account#: ${this.theBankAccountDetails.accountNumber}`;
    return str;
  }

  public updateBankDetails(brName: string, brNum: number, accNum: number): void {
    this.theBankAccountDetails.branchName = brName;
    this.theBankAccountDetails.branchNumber = brNum;
    this.theBankAccountDetails.accountNumber = accNum;
    localStorage.setItem(BANK_DETAILS_KY, JSON.stringify(this.theBankAccountDetails));
  }

}
