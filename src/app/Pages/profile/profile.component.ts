import { Component } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public dataListing:any=[];
  public propertyListing:any=[];
  public ticketListing:any=[];
  public BidListing:any=[];
  public loading:boolean = true;
  public loginDetail:any =[];
  public totalCount: number = 0;
  public p = 1;
  public userId:any='';
  public pageLimit = 10;
  public previousLabel:any='';
  public nextLabel:any='';
  public searchKey:any=0;
  public serviceLIst:any=[];
  
  constructor(public router: Router, public service: GlobalService) { 
    this.loginDetail = JSON.parse(localStorage.getItem('pza_login') || "{}");  
    this.userId =localStorage.getItem('pza_user_id') ;
    this.getDetail();
   }

  ngOnInit(): void {
  }

     getDetail(){
      var url='/admin/user-details/'+this.userId;
      this.service.GetApi(url).subscribe(((response:any)=>{
        if(response.success ==1) {  
          var self =this; 
          response.data.fullname = response.data.firstName + ' '+ response.data.lastName;
          if(response.data.role=='Owner'){
            this.propertyListing =response.data.myProperties;
          }
          if(response.data.role=='Vendor'){
            this.BidListing = response.data.bidRequest;
            this.serviceLIst = response.data.vendorService;
          }
          if(response.data.role=='Managment'){
            this.propertyListing =response.data.propertyAssign;
          }
          if(response.data.role=='User'){
            this.propertyListing =response.data.propertyAssign;
            this.ticketListing = response.data.tickets;
          }
          this.dataListing =response.data;
          this.loading=false;
        } else {
          this.dataListing=[];
          this.loading=false;
        }
      }), (error) => { this.loading =false; });
    }

    redirect(item:any){
      if(this.dataListing.role=='Managment'){
        localStorage.setItem('pza_content',JSON.stringify(item.property[0]));
      } else {
        localStorage.setItem('pza_content',JSON.stringify(item));
      }
      this.router.navigate(['/property-detail']);
    }

  
}
