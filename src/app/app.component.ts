import { Component } from '@angular/core'
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  showMenu: boolean = true;
  constructor(private router_srv: Router) { 

  }

  hideMenu(): boolean{
    if (this.router_srv.url == '/AccountLogin' || this.router_srv.url == '/ChangePassword' || this.router_srv.url == '/SingleTransaction'|| this.router_srv.url == '/FirstPage' ){
      return false;
    }
    else{
      return true;
    }
  }

  
}

