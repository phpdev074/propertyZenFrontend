import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  subscription =<any> Subscription;
  public loginTrue:boolean= false;
  public loginDetail:any =[];
  public urlTrue:boolean = false;
  public NotificationDetail : any =[];
  public dataCount : any =1;
  public noti_length :any = 0;
  public pagecount: any = 1;
  public UnreadCount : any=0;
  public loginImage:any='';
  public search:any='';
  public viewClose:boolean=false


  constructor(public router: Router, public service: GlobalService) {   
    if(localStorage.getItem('pza_login')){
      this.subscription = this.service.getSubject().subscribe((message:any)=>{
        this.loginDetail=message.loginData;
      })
      this.loginTrue = true;
      this.loginDetail = JSON.parse(localStorage.getItem('pza_login') || "{}");
      if(this.loginDetail.profile_image ==''){
        this.loginImage ='../../../assets/images/avatar-1.png';
      } else {
        this.loginImage = this.loginDetail.profile_image;
      }
      this.getNotifiction();
    }
    }

   ngOnInit(): void {
    if(localStorage.getItem('pza_serchView')){
      var mm :any =localStorage.getItem('pza_serchView');
      if(mm==1){
        this.urlTrue = true;
      } else {
        this.urlTrue = false;
      }      
    }
   }

   getNotifiction(){
    // var detail ={"page":this.pagecount};
    var url = '/notification';
    this.service.GetApi(url).subscribe(((response : any) => {
      if(response.success){ 
        if(response.data.length!=0){
          const data = response.data.data; 
          for(let i=0;i<data.length;i++)  {
            var date= this.service.dateCon(data[i].createdAt);
            var time = this.service.dateTImeCon(data[i].createdAt,2);
            var ss=new Date(date + ' '+time);            
            data[i].create_dt_utc_new = this.service.timeago(new Date(ss.getTime() - ss.getTimezoneOffset() * 60000));

            // data[i].create_dt_utc_new = this.service.dateConvert(data[i].createdAt,5);
            if(data[i].isRead == false){
              data[i].class="unread";
            }
          }
        }
        this.NotificationDetail = response.data.data;
        // if(this.pagecount == 1){
        //   this.NotificationDetail = response.data.data;
        // } else {
        //   this.NotificationDetail =this.NotificationDetail.concat(response.data.data);
        // }
        this.noti_length = response.data.data.length;
        this.UnreadCount = response.data.unreadCount;
      } else{
        this.dataCount = 0;
      }
    }))
  }

  getMarkRead(data :any){
    if(data.isRead == false){
      this.markRead(data._id);
      this.router.navigate(['/property']);
    }
  }

//onScroll function for scroll listing..of the event,...
  onScroll() {
    if(this.dataCount!=0 && this.noti_length == 10) {
      this.pagecount++;
      this.getNotifiction();
    }
  }

  markRead(id:any){
    // var detail ={ "notification_id":id};
    var url =  '/notification/' + id;
    this.service.updateApi({},url).subscribe(((response : any) => {
      if(response.status){
        this.pagecount = 1;
        this.getNotifiction();  
      } else{
      }
    }))
  }

  close(){
    $('#CONFIRMPopup1').modal('toggle');
  }

  searchText(type:any){
    if(type==1){
      this.viewClose=true;
      localStorage.setItem('pza_serachText',this.search);
      this.router.navigate(['/search']);  
    } else {
      this.viewClose= false;
      this.search='';
      localStorage.removeItem('pza_serachText');
      this.router.navigate(['/dashboard']);  

    }
  }
}
