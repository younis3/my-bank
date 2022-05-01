import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountOwner } from '../account-owner';
import { OwnerService } from '../owner.service';
import { UserManager } from '../user-manager';

@Component({
  selector: 'app-account-owner',
  templateUrl: './account-owner.component.html',
  styleUrls: ['./account-owner.component.css']
})
export class AccountOwnerComponent implements OnInit {
  curOwner: AccountOwner;
  curOwnerName: string;
  curOwnerAdrs: string;
  curOwnerHasPic: boolean;
  curOwnerId: number;

  constructor(private owner_srv: OwnerService ,private router_srv: Router) {
    this.curOwner = owner_srv.loadAccOwner();
    this.curOwnerName = this.curOwner.name;
    this.curOwnerAdrs = this.curOwner.address;
    this.curOwnerHasPic = this.curOwner.hasPicture;
    this.curOwnerId = this.curOwner.tz;
  }

  ngOnInit(): void {
    
    if (!UserManager.isUserSignedIn()){
      alert("user not singend in");
      this.router_srv.navigateByUrl('/AccountLogin');
    }
    
   
  }


  cancel(): void {
    this.curOwnerName = this.curOwner.name;
    this.curOwnerAdrs = this.curOwner.address;
    this.curOwnerHasPic = this.curOwner.hasPicture;
    this.curOwnerId = this.curOwner.tz;
  }


  save(): void {
    if (this.curOwnerName == "") {
      alert("Name is required");
      document.getElementById("name")?.focus();
      return;
    }
    else if (this.curOwnerAdrs == "") {
      alert("Address is required");
      document.getElementById("address")?.focus();
      return;
    }
    this.owner_srv.updateOwner(this.curOwnerName, this.curOwnerAdrs, this.curOwnerHasPic);
  }


}
