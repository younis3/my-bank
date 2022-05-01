import { Injectable } from '@angular/core';
import { AccountOwner } from './account-owner';

const ACCOUNT_OWNER_DETAILS_KY: string = "ACCOUNT_OWNER_DETAILS";

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  public theAccountOwner: AccountOwner = new AccountOwner("plonit almonit", "TA", 129387465);

  constructor() {
    if (localStorage.getItem(ACCOUNT_OWNER_DETAILS_KY) != null) {
      try {
        this.theAccountOwner = JSON.parse(localStorage.getItem(ACCOUNT_OWNER_DETAILS_KY)||'{}');
      }
      catch (err) {
        localStorage.setItem(ACCOUNT_OWNER_DETAILS_KY, JSON.stringify(this.theAccountOwner));
        console.log("JSON Problem: " + err);
      }
    }
    else {
      localStorage.setItem(ACCOUNT_OWNER_DETAILS_KY, JSON.stringify(this.theAccountOwner));
    }
  }

  public loadAccOwner(): AccountOwner {
    return this.theAccountOwner;
  }

  public updateOwner(nwOwnrName: string, nwOwnrAdrs: string, nwOwnrHasPic: boolean): void {
    this.theAccountOwner.name = nwOwnrName;
    this.theAccountOwner.address = nwOwnrAdrs;
    this.theAccountOwner.hasPicture = nwOwnrHasPic;
    localStorage.setItem(ACCOUNT_OWNER_DETAILS_KY, JSON.stringify(this.theAccountOwner));
  }

}
