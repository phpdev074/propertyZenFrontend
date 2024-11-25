import { Component, OnInit ,HostListener } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public loading:boolean = true;
  public detaildata:any=[];
  // public AlbumList:any =[];
  // public b_AlbumList:any=[];
  public loginDetail:any =[];

  constructor(public router: Router, private service: GlobalService) {
    this.loginDetail = JSON.parse(localStorage.getItem('pza_login') || "{}");  
    this.getData();

  }

  ngOnInit(): void {    
  }

 
  getData(){
  const url = "/admin/dashboard"; 
    this.service.GetApi(url).subscribe(((response:any)=>{
      if(response.success ==1) { 
          
        this.detaildata=response.data; 
        this.loading=false;  

      } else {
        this.loading=false;
        // for(var i:any=1; i<9;i++){
        //   this.b_AlbumList.push(i);
        // }
      }
    }), (error) => { this.loading =false; });
  }

  redirect(url:any){
      this.router.navigate([url]);
  }

}
