import { Injectable } from '@angular/core';
import { TransactionType } from './bank-transaction';

const ACCOUNT_BALANCE_KY = "ACCOUNT_BALANCE";


@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  theAccountCurrentBalance: number = 0;


  constructor() {
    if (localStorage.getItem(ACCOUNT_BALANCE_KY) != null) {
      try {
        this.theAccountCurrentBalance = JSON.parse(localStorage.getItem(ACCOUNT_BALANCE_KY) || '{}');
      }
      catch (err) {
        localStorage.setItem(ACCOUNT_BALANCE_KY, JSON.stringify(this.theAccountCurrentBalance));
        console.log("JSON Problem: " + err);
      }
    }
    else {
      localStorage.setItem(ACCOUNT_BALANCE_KY, JSON.stringify(this.theAccountCurrentBalance));
    }
  }



  public getBalance(): number {
    return this.theAccountCurrentBalance;
  }


  public updateBalance(blnce: number): void {
    this.theAccountCurrentBalance = blnce;
    localStorage.setItem(ACCOUNT_BALANCE_KY, JSON.stringify(this.theAccountCurrentBalance));
  }


  public deleteBalance(amount: number, trnType: TransactionType): void {
    trnType == TransactionType.deposit ? this.updateBalance(this.theAccountCurrentBalance - amount) : this.updateBalance(this.theAccountCurrentBalance + amount);
  }





}

