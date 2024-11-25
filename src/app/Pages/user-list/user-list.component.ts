import { Component } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  public dataListing:any=[];
  public loading:boolean = true;
  public loginDetail:any =[];
  public totalCount: number = 0;
  public p = 1;
  public pageLimit = 10;
  public previousLabel:any='';
  public nextLabel:any='';
  public EmailSearch:any='';
  public statusKey:any='';
  public NameSearch:any='';
  public currentUrl:any=this.router.url;
  public role:any='';
  public status:any='';
  
  constructor(public router: Router, public service: GlobalService) { 
    this.loginDetail = JSON.parse(localStorage.getItem('pza_login') || "{}");   
    if(this.currentUrl =='/management-listing'){
      this.role ='Managment';
    }
    if(this.currentUrl =='/vendor-listing'){
      this.role ='Vendor';
    }
    if(this.currentUrl =='/tenant-listing'){
      this.role ='User';
    }
    if(this.currentUrl =='/user-listing'){
      this.role ='Owner';
    }
    this.getDetail(1);


   }

  ngOnInit(): void {
  }

     getDetail(page:any){
      this.loading=true;
      var url:any='/admin?page='+page+'&limit='+this.pageLimit+ '&role=' +this.role;;
      if(this.NameSearch !='' ){      
        url=url +'&name='+this.NameSearch;     
      } 
      if( this.EmailSearch !='' ){
          url=url +'&email='+this.EmailSearch;
      }  
      if(this.statusKey !='') {
        url=url +'&status='+this.statusKey;
      } 
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

    redirect(item:any,type:any){
      if(type==1){
        localStorage.setItem('pza_user_id',item._id);
        this.router.navigate(['/profile']);
      } else {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result:any) => {
          let statusType: number = 0;
          if (result.isConfirmed) {
            this.delete(item._id);
            // $('#text3').trigger('click');
          }
        });
      }
    
    }

    verifyAccount(item:any){
      var url='/admin/verify-account/'+item._id+"?status="+this.status;
      this.service.updateApi({},url).subscribe(((response:any)=>{
        if(response.success==1){
          this.service.successAlert(response.message);
          this.getDetail(1);
        } else {
          this.service.dangerAlert(response.message);
        }
      }))
    }

    reset(){
      this.p=1;
      this.pageLimit=10;
      this.EmailSearch='';
      this.NameSearch='';
      this.statusKey='';
      this.getDetail(1);
    }

    delete(id:any){
      // if(this.reasons==''){
      //   this.service.dangerAlert('Please give reason');
      //   return;
      // } else {
      //   var detail={
      //     "cancellationReason": this.reasons
      //   }
      var url='/admin/delete/'+ id;     
        this.service.updateApi({},url).subscribe(((response:any)=>{
          if(response.success==1) {  
            this.loading=false;
            this.p=1;
            this.getDetail(this.p);
          } else {
            this.loading=false;
          }
        }), (error) => { this.loading =false; });
      // }
    }

}
