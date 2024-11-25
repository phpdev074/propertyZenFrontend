import { Component } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent {

  public dataListing:any=[];
  public userListing:any=[];

  public loading:boolean = true;
  public loginDetail:any =[];
  public totalCount: number = 0;
  public p = 1;
  public pageLimit = 10;
  public previousLabel:any='';
  public nextLabel:any='';
  public searchKey:any=0;
  public UserId:any='';
  public prpertyId:any='';

  
  constructor(public router: Router, public service: GlobalService) { 
    this.getUserDetail();
    this.loginDetail = JSON.parse(localStorage.getItem('pza_login') || "{}");   
    this.getDetail(1);
   }

  ngOnInit(): void {
  }

     getDetail(page:any){
      var url = '/property?page='+page+'&limit='+this.pageLimit;
      // + '&address=';
      this.service.GetApi(url).subscribe(((response:any)=>{
        if(response.success ==1) {  
          var self =this;  
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
      this.router.navigate(['/property-detail']);
    }

    assignProperty(){
      var url='/admin/property-assign';
      var detail={
        "userId": this.UserId,
        "propertyId": this.prpertyId
      }
      this.service.PostApis(detail,url).subscribe(((response:any)=>{
        if(response.success==1){
          this.service.successAlert(response.message);
          $('#clsbtn').trigger('click');
          this.getDetail(1);
        } else {
          this.service.dangerAlert(response.message);
        }
      }))
    }

    getUserDetail(){
      this.service.GetApi('/admin?role=Managment&status=Approved').subscribe(((response:any)=>{
        if(response.success ==1) {  
          var self =this;  
          this.userListing=response.data ;
          this.totalCount = response.total_counts;  
          this.loading=false;
        } else {
          this.userListing=[];
          this.totalCount = response.total_counts;  

          this.loading=false;
        }
      }), (error) => { this.loading =false; });
    }
    
}
