import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountOwner } from '../account-owner';
import { BalanceService } from '../balance.service';
import { OwnerService } from '../owner.service';
import { UserManager } from '../user-manager';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showNavBar: boolean = false;
  owner: AccountOwner;

  constructor(private router_srv: Router, public blnce_srv: BalanceService, private owner_srv: OwnerService) {
    this.owner = this.owner_srv.loadAccOwner();
  }

  ngOnInit(): void {

  }


  logOut(): void {
    UserManager.byeUser();
    this.router_srv.navigateByUrl("/AccountLogin");
  }



}
