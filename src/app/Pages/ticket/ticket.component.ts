import { Component } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {

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

  constructor(public router: Router, public service: GlobalService) { 
    this.loginDetail = JSON.parse(localStorage.getItem('pza_login') || "{}");   
    this.getDetail(1);
   }

  ngOnInit(): void {
  }

     getDetail(page:any){
      this.loading=true;
      var url:any='';
      if(this.statusKey =='' &&  this.issueKey==''){
        url='/issue-tickets?page='+page+'&limit='+this.pageLimit;
      } else {
      if(this.statusKey =='' &&  this.issueKey!=''){ 
        url='/issue-tickets?page='+page+'&limit='+this.pageLimit +'&issueType='+this.issueKey;     
      } else if(this.statusKey !='' &&  this.issueKey==''){
          url='/issue-tickets?page='+page+'&limit='+this.pageLimit +'&status='+this.statusKey;
      }  else {
        url='/issue-tickets?page='+page+'&limit='+this.pageLimit +'&status='+this.statusKey+'&issueType='+this.issueKey;
      } 
      }
      this.service.GetApi(url).subscribe(((response:any)=>{
        if(response.success ==1) {  
          var self =this;            
          response.data.filter((el:any)=>{
            if(el.parentData.issueType==0){
              el.parentData.issueTypeN='Outside';
            } else {
              el.parentData.issueTypeN='Inside';
            }
          })
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
      localStorage.setItem('pza_content',JSON.stringify(item));
      this.router.navigate(['/ticket-detail']);
    }

    reset(){
      this.p=1;
      this.pageLimit=10;
      this.statusKey='';
      this.issueKey=''
      this.getDetail(1);
    }

}
