import { Component } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-bid-detail',
  templateUrl: './bid-detail.component.html',
  styleUrls: ['./bid-detail.component.scss']
})
export class BidDetailComponent {

  
  public currentdetail:any=[];
  public loading:boolean = false;

  constructor(public router: Router, public service: GlobalService) { 
    this.currentdetail = JSON.parse(localStorage.getItem('pza_Bcontent')|| '{}');
  }
}
