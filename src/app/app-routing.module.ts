import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountOwnerComponent } from './account-owner/account-owner.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { ChangeBankComponent } from './change-bank/change-bank.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SingleTransactionComponent } from './single-transaction/single-transaction.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  { path: '', redirectTo: 'AccountLogin', pathMatch: 'full' },
  { path: 'AccountLogin', component: AccountLoginComponent },
  { path: 'ChangeOwnerDetails', component: AccountOwnerComponent },
  { path: 'ChangeBank', component: ChangeBankComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'SingleTransaction', component: SingleTransactionComponent },
  { path: 'BankAccount', component: BankAccountComponent },
  { path: 'ChangePassword', component: ChangePasswordComponent },
  { path: '', component: AccountLoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
