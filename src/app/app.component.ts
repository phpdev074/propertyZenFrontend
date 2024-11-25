import { Component } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'propertyZen';
  public LoginDetail: any = [];
  public loginTrue: boolean = false;
  public currentUrl:any ='';
  public loading:boolean = false;

  constructor(public router: Router, private service: GlobalService) { 
  }

  ngOnInit() {   
  }

  changeRoute() { 
    this.currentUrl =this.router.url;   
    if (localStorage.getItem("pza_login")) {
      this.LoginDetail = JSON.parse(localStorage.getItem("pza_login") || "{}");
      this.service.setSubject(this.LoginDetail.user);
    } 
    if(this.currentUrl == '/signin' || this.currentUrl == '/' ){
      $('#beforeLoginbg').addClass('bg-login')
    } else {
      $('#beforeLoginbg').removeClass('bg-login')
    }
  }

}

