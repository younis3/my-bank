import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountOwner } from '../account-owner';
import { BalanceService } from '../balance.service';
import { BankAccountDetails } from '../bank-account-details';
import { TransactionType, BankTransaction } from '../bank-transaction';
import { TransactionsService } from '../transactions.service';
import { UserManager } from '../user-manager';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})

export class BankAccountComponent implements OnInit {
  currentAmount: number = 0;
  currentBalance: number = 0;
  transaction?: BankTransaction = undefined;
  accountDetails: BankAccountDetails;
  currentTransactionType: TransactionType = -1;
  currentTransactionAsmachta: string = "";
  currentTransactionDateS: string = "";
  currentOwner: AccountOwner = new AccountOwner("plonit almonit", "ta", 129387465);
  transactionTypeNames: string[] = [];
  lastActionFail: boolean = false
  editAccountOwner: boolean = false;
  trnsArr: BankTransaction[] = [];
  currentTransactionNote: string = "";


  constructor(private router_srv:Router, private trans_srv: TransactionsService, private blnce_srv: BalanceService) {
    //this.transaction = new BankTransaction(1000, undefined, "opening", TransactionType.openAcount);
    this.accountDetails = new BankAccountDetails("Rimonim Givataim", 762, 113344);
    this.currentBalance = blnce_srv.getBalance();
    this.trnsArr = trans_srv.getTransactions();
    this.currentTransactionAsmachta = `#${this.trans_srv.getCount() + 1}`;

    for (let optn in TransactionType)
      if (isNaN(Number(optn)))
        this.transactionTypeNames.push(optn);

  }

  
  ngOnInit(): void {
    
    if (!UserManager.isUserSignedIn()){
      this.router_srv.navigateByUrl('/AccountLogin');
    }
    
 
  }


  doTransaction(): void {
    this.lastActionFail = false;
    if (this.currentAmount == null || this.currentAmount < 0) {
      showErrorFocus("סכום חייב להיות מספר לא שלילי", "amount");
      return;
    }
    /*
    if (this.currentTransactionAsmachta == null || this.currentTransactionAsmachta.trim()=="" || this.currentTransactionAsmachta.trim().length<4) {
      showErrorFocus("אסמכתא לפחות 4 תוים", "asmachta");
      return;
    }
    */
    if (this.currentTransactionDateS == "" ) {
      showErrorFocus("תאריך חובה", "taarich");
      return;
    }
    let achshav:Date=new Date();
    let typedDt:Date=new Date(this.currentTransactionDateS);
    if (typedDt>achshav)
    {
      showErrorFocus("תאריך מאוחר מהיום אסור", "taarich");
      return;
    }

    if (!this.trnsArr.length) {
      
      if (!this.currentTransactionType || isNaN(this.currentTransactionType)) {
        alert("נא לבחור סוג פעולה");
        document.getElementById("sugpeula")?.focus();
        return;
      }
      
      if (this.currentTransactionType == TransactionType.withdraw) {
        alert("הפעולה לא חוקית");
        document.getElementById("sugpeula")?.focus();
        return;
      }
      else if (this.currentTransactionType == TransactionType.deposit) {
        this.currentTransactionType = TransactionType.openAcount;
        this.currentTransactionNote = "הפעולה נשמרה כפתיחת חשבון בגלל שזו פעולה ראשונה";
      }
    }
    else {   
      if (!this.currentTransactionType || isNaN(this.currentTransactionType)) {
        alert("נא לבחור סוג פעולה");
        document.getElementById("sugpeula")?.focus();
        return;
      }
    }


    switch (this.currentTransactionType * 1) {
      case TransactionType.openAcount: this.currentBalance = this.currentAmount;
        break;
      case TransactionType.deposit: this.currentBalance += this.currentAmount;
        break;
      case TransactionType.withdraw: if ((this.currentBalance - this.currentAmount) < this.accountDetails.limit) {
        this.lastActionFail = true;
        return;
      }
        this.currentBalance -= this.currentAmount;
        break;
      default: alert('לא בחרת סוג פעולה');
        return;

    }
    if (this.currentTransactionAsmachta == ""){
      this.currentTransactionAsmachta = `#${this.trans_srv.getCount() + 1}`;
    }
    
    this.transaction = new BankTransaction(this.currentAmount, new Date(this.currentTransactionDateS), this.currentTransactionAsmachta.trim(), this.currentTransactionType, this.currentBalance,this.currentTransactionNote);
    this.trnsArr.push(this.transaction); 


    this.blnce_srv.updateBalance(this.currentBalance);
    this.trans_srv.updateTransactions(this.trnsArr);
    this.trans_srv.addCount();


    this.currentTransactionType = -1;   
    this.currentTransactionAsmachta = `#${this.trans_srv.getCount() + 1}`;
    this.currentTransactionNote = "";

  }

  toString(): string {
    let ezer = `${this.transaction} into ${this.accountDetails}`;
    return ezer;
  }


  logOut():void
  {
    UserManager.byeUser();
    this.router_srv.navigateByUrl('/AccountLogin');
  }
  
}
function showErrorFocus(msg: string, id: string): void {
  alert(msg);
  document.getElementById(id)?.focus();
}
