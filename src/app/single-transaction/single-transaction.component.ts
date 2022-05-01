import { Component, OnInit } from '@angular/core';
import { TransactionType, BankTransaction } from '../bank-transaction';
import { TransactionsService } from '../transactions.service';
import { Router } from '@angular/router';
import { BalanceService } from '../balance.service';
import { UserManager } from '../user-manager';

@Component({
  selector: 'app-single-transaction',
  templateUrl: './single-transaction.component.html',
  styleUrls: ['./single-transaction.component.css']
})
export class SingleTransactionComponent implements OnInit {

  transIdx: number = 0;
  transaction: any;
  transactionTypeNames: string[] = [];
  note: string = "";

  constructor(private router_srv: Router, private trns_srv: TransactionsService, private blnce_srv: BalanceService) {
    for (let optn in TransactionType)
      if (isNaN(Number(optn)))
        this.transactionTypeNames.push(optn);
  }


  ngOnInit(): void {
    
    if (!UserManager.isUserSignedIn()){
      alert("user not singend in");
      this.router_srv.navigateByUrl('/AccountLogin');
    }
    
   
   
    this.transIdx = this.trns_srv.getCurTransIdx();
    this.transaction = this.trns_srv.getClickedTransaction();
    if (this.transaction) {
      if (!this.transaction.note) {
        this.note = "No Comment Found";
      }
      else {
        this.note = this.transaction.note;
      }
    }
    
  }


  delete(): void {
    if (confirm("Are you sure to delete this transaction?")) {
      if (this.transaction.trnTyp == TransactionType.openAcount) {
        alert("אי אפשר למחוק פעולת פתיחת חשבון")
      }
      else {
        //remove
        this.blnce_srv.deleteBalance(this.transaction.amount, this.transaction.trnTyp);  
        this.trns_srv.deleteTransaction(this.transIdx);   
        this.router_srv.navigateByUrl("/transactions");
      }
    }
  }


  back(): void {
    this.router_srv.navigateByUrl("/transactions");
  }


}
