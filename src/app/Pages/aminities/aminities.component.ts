import { Component } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-aminities',
  templateUrl: './aminities.component.html',
  styleUrls: ['./aminities.component.scss']
})
export class AminitiesComponent {
  public dataListing:any=[];
  public loading:boolean = true;
  public loginDetail:any =[];
  public totalCount: number = 0;
  public p = 1;
  public pageLimit = 10;
  public previousLabel:any='';
  public nextLabel:any='';
  public searchKey:any=0;
  
  constructor(public router: Router, public service: GlobalService) { 
    this.loginDetail = JSON.parse(localStorage.getItem('pza_login') || "{}");   
    this.getDetail(1);
   }

  ngOnInit(): void {
  }

     getDetail(page:any){
      var url = '/amenities?page='+page+'&limit='+this.pageLimit;
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
      this.router.navigate(['/amenities-edit']);
    }


}
