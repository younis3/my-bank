import { Injectable } from '@angular/core';
import { BankTransaction } from './bank-transaction';

const ACCOUNT_TRANSACTIONS_KY = "ACCOUNT_TRANSACTIONS";
const TRANSACTION_COUNT_KY = "ACCOUNT_TRANSCATION_COUNT";  

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  public theAccountTransactions: BankTransaction[] = [];
  public currTransIdx: number = 0;
  public transCount: number = 0;

  constructor() {

    if (localStorage.getItem(ACCOUNT_TRANSACTIONS_KY) != null) {
      try {
        this.theAccountTransactions = JSON.parse(localStorage.getItem(ACCOUNT_TRANSACTIONS_KY) || '{}');
      }
      catch (err) {
        localStorage.setItem(ACCOUNT_TRANSACTIONS_KY, JSON.stringify(this.theAccountTransactions));
        console.log("JSON Problem: " + err);
      }
    }
    else {
      localStorage.setItem(ACCOUNT_TRANSACTIONS_KY, JSON.stringify(this.theAccountTransactions));
    }


    if (localStorage.getItem(TRANSACTION_COUNT_KY) != null) {
      try {
        this.transCount = JSON.parse(localStorage.getItem(TRANSACTION_COUNT_KY)|| '{}');
      }
      catch (err) {
        localStorage.setItem(TRANSACTION_COUNT_KY, JSON.stringify(this.transCount));
        console.log("JSON Problem: " + err);
      }
    }
    else {
      localStorage.setItem(TRANSACTION_COUNT_KY, JSON.stringify(this.transCount));
    }

  }

  public getTransactions(): BankTransaction[] {
    return this.theAccountTransactions;
  }

  public updateTransactions(arr: BankTransaction[]) {
    this.theAccountTransactions = arr;
    localStorage.setItem(ACCOUNT_TRANSACTIONS_KY, JSON.stringify(this.theAccountTransactions));
  }

  public getCurTransIdx(): number {
    return this.currTransIdx;
  }

  public setCurTransIdx(idx:number): void {
    this.currTransIdx = idx;
  }

  public getClickedTransaction(): BankTransaction {
    return this.theAccountTransactions[this.currTransIdx];
  }

  public deleteTransaction(trnsIdx: number): void {
    this.theAccountTransactions.splice(trnsIdx, 1);
    localStorage.setItem(ACCOUNT_TRANSACTIONS_KY, JSON.stringify(this.theAccountTransactions));
  }


  public getCount(): number {
    return this.transCount;
  }

  public addCount(): void {
    this.transCount += 1;
    localStorage.setItem(TRANSACTION_COUNT_KY, JSON.stringify(this.transCount));
  }

}



