import { Component } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss']
})
export class VisitorComponent {

  public dataListing:any=[];
  public loading:boolean = true;
  public loginDetail:any =[];
  public totalCount: number = 0;
  public p = 1;
  public pageLimit = 10;
  public previousLabel:any='';
  public nextLabel:any='';
  public statusKey:any='';
  public issueKey:any='';
  public currentUrl:any=this.router.url;
  public role:any='';
  public status:any='';
  
  constructor(public router: Router, public service: GlobalService) { 
    this.loginDetail = JSON.parse(localStorage.getItem('pza_login') || "{}");      
    this.getDetail(1);
   }

  ngOnInit(): void {
  }

     getDetail(page:any){
      this.loading=true;
      var url:any='/admin/visiter-listing?page='+page+'&limit='+this.pageLimit;
      this.service.GetApi(url).subscribe(((response:any)=>{
        if(response.success ==1) {  
          var self =this; 
          if(response.data.length !=0){
            response.data.filter((ell:any)=>{
              var ss :any =ell.bidRequest.scheduleTime.split('-');
              var date1=self.service.timeConvert(ss[0]);
              var date2=self.service.timeConvert(ss[1]);
              ell.bidRequest.scheduleTime = date1 + ' - ' +date2 ;
              ell.bidRequest.dateTime = self.service.dateCon(ell.bidRequest.scheduleDate) ;
            })
          }
          this.dataListing=response.data ;
          this.totalCount = response.total_counts;  
          this.loading=false;
        } else {
          this.dataListing=[];
          this.totalCount = response.total_counts;  
          this.loading=false;
        }
      }), (error) => { this.loading =false; });
    }

    redirect(item:any){
      localStorage.setItem('pza_user_id',item._id);
      this.router.navigate(['/profile']);
    }

    reset(){
      this.p=1;
      this.pageLimit=10;
      this.getDetail(1);
    }



}

