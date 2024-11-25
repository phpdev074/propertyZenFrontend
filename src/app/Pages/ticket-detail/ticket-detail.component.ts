import { Component } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDEtailComponent {

  public currentdetail:any=[];
  public loading:boolean = false;
  public Imagess:any='';
  public imgHeight:any='';
  public imgWidth:any='';
  public count:any=0;


  constructor(public router: Router, public service: GlobalService) { 
    this.currentdetail = JSON.parse(localStorage.getItem('pza_content')|| '{}');
    this.currentdetail.UserName= this.currentdetail.userData.firstName +' '+ this.currentdetail.userData.lastName;
    this.currentdetail.createdDate = this.service.dateCon(this.currentdetail.createdAt); 
    if(this.currentdetail.vendorData.firstName ==undefined){
      this.currentdetail.vendorName =this.currentdetail.ticketType;
    } else {
      this.currentdetail.vendorName = this.currentdetail.vendorData.firstName;
    }    
  }

  zoomin() {
    let GFG:any = document.getElementById("geeks");
    if(this.count ==0){
      this.imgHeight=GFG.clientHeight;
      this.imgWidth=GFG.clientWidth;
      this.count=1;
    }
    let currHeight = GFG.clientHeight;
    let currwidth = GFG.clientWidth;
    if(currwidth<400){
      // GFG.style.height = (currHeight + 40) + "px";
      GFG.style.width = (currwidth + 40) + "px";
    }
  }

  zoomout() {
      let GFG :any= document.getElementById("geeks");
      if(this.count ==0){
        this.imgHeight=GFG.clientHeight;
        this.imgWidth=GFG.clientWidth;
        this.count=1;
      }
      let currHeight = GFG.clientHeight;
      let currwidth = GFG.clientWidth;
      if( currwidth>160){
        // GFG.style.height = (currHeight - 40) + "px";
        GFG.style.width = (currwidth - 40) + "px";  
      }
  } 

  zoom(){
    let GFG :any= document.getElementById("geeks");
    GFG.style.height = this.imgHeight + "px";
    GFG.style.width = this.imgWidth + "px";
  }


}
