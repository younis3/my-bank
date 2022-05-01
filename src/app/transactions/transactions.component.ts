import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../transactions.service';
import { TransactionType, BankTransaction } from '../bank-transaction';
import { BalanceService } from '../balance.service';
import { Router } from '@angular/router';
import { UserManager } from '../user-manager';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transArr: BankTransaction[] = this.trns_srv.getTransactions();
  transactionTypeNames: string[] = [];
  currBalance: number = 0;
  constructor(private router_srv: Router, private trns_srv: TransactionsService, private blnce_srv: BalanceService) {
    this.currBalance = this.blnce_srv.getBalance();
    for (let optn in TransactionType)
      if (isNaN(Number(optn)))
        this.transactionTypeNames.push(optn);
  }

  ngOnInit(): void {
    
    if (!UserManager.isUserSignedIn()){
      alert("user not singend in");
      this.router_srv.navigateByUrl('/AccountLogin');
    }
    
      
  }


  setTransIndex(trnsIdx:number): void {
    this.trns_srv.setCurTransIdx(trnsIdx);
    this.router_srv.navigateByUrl("/SingleTransaction");
  }

}
