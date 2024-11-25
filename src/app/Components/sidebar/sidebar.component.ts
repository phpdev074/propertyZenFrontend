import { Component } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public loginDetail:any =[];


  constructor(public router: Router, public service: GlobalService) {
    this.loginDetail = JSON.parse(localStorage.getItem('pza_login') || "{}");

  }

  close(){
    $('#CONFIRMPopup').modal('toggle');
  }

  redirect(){
    this.router.navigate(['/dashboard']);
  }
}
