import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { BankAccountComponent } from './bank-account/bank-account.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccountOwnerComponent } from './account-owner/account-owner.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SingleTransactionComponent } from './single-transaction/single-transaction.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChangeBankComponent } from './change-bank/change-bank.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountOwnerComponent,
    ChangeBankComponent,
    BankAccountComponent,
    AccountLoginComponent,
    ChangePasswordComponent,
    TransactionsComponent,
    SingleTransactionComponent,
    NavbarComponent,
    PageNotFoundComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
