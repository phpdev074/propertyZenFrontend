import { Component } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss']
})
export class BidComponent {

  public dataListing:any=[];
  public loading:boolean = true;
  public loginDetail:any =[];
  public totalCount: number = 0;
  public p = 1;
  public pageLimit = 10;
  public previousLabel:any='';
  public nextLabel:any='';
  public statusKey:any='';
  
  constructor(public router: Router, public service: GlobalService) { 
    this.loginDetail = JSON.parse(localStorage.getItem('pza_login') || "{}");   
    this.getDetail(1);
   }

  ngOnInit(): void {
  }

     getDetail(page:any){
      var url:any='';
      if(this.statusKey==''){
        url='/admin/bids?page='+page+'&limit='+this.pageLimit;
      } else {
        url='/admin/bids?page='+page+'&limit='+this.pageLimit+'&status='+this.statusKey;
      }
      
      this.service.GetApi(url).subscribe(((response:any)=>{
        if(response.success ==1) {  
          var self =this;  
          this.loading=false;
          if(response.data.length !=0){
            response.data.filter((el:any)=>{
              el.createdAt = self.service.dateCon(el.createdAt);
              // if(el.scheduleDate != undefined){
              //   el.scheduleDate = self.service.dateCon(el.scheduleDate);
              // }
              if(el.bidRequest.length !=0){
                el.bidRequest.filter((ell:any)=>{
                  ell.createdAt=self.service.dateCon(ell.createdAt);
                  if(ell.scheduleDate != undefined){
                    el.titles='Schedule Date';
                    el.Dates = self.service.dateCon(ell.scheduleDate);
                  }
                  if(ell.repairDate != undefined){
                    el.titles='Repair Date';
                    el.Dates = self.service.dateCon(ell.repairDate);
                  }
                })
              }
            })
          }
          this.dataListing=response.data ;
          this.totalCount = response.total_counts; 
        } else {
          this.dataListing=[];
          this.totalCount = response.total_counts;  
          this.loading=false;
        }
      }), (error) => { this.loading =false; });
    }

    redirect(item:any){
      localStorage.setItem('pza_Bcontent',JSON.stringify(item));
      this.router.navigate(['/bid-detail']);
    }

    reset(){
      this.statusKey='';
      this.pageLimit=10;    
      this.getDetail(1);
    }

}
