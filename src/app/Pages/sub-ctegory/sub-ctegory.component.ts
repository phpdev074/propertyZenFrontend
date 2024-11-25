import { Component } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
declare var $:any;


@Component({
  selector: 'app-sub-ctegory',
  templateUrl: './sub-ctegory.component.html',
  styleUrls: ['./sub-ctegory.component.scss']
})
export class SubCtegoryComponent {

  public dataListing:any=[];
  public loading:boolean = true;
  public loginDetail:any =[];
  public totalCount: number = 0;
  public p = 1;
  public pageLimit = 10;
  public previousLabel:any='';
  public nextLabel:any='';
  public searchKey:any=0;
  public currentdetail:any=[];
  public currentUrl:any=this.router.url;

  
  constructor(public router: Router, public service: GlobalService) { 
    this.loginDetail = JSON.parse(localStorage.getItem('pza_login') || "{}");      
    if(this.currentUrl !='/category'){
      this.currentdetail = JSON.parse(localStorage.getItem('pza_cat_content')|| '{}'); 
    } else {
      this.currentdetail = JSON.parse(localStorage.getItem('pza_content')|| '{}'); 
    }
    this.getDetail(1);
   }

  ngOnInit(): void {
  }

     getDetail(page:any){
      var url = '/services/'+ this.currentdetail._id;
      // page='+this.p+'&limit='+this.pageLimit +'&
      this.service.GetApi(url).subscribe(((response:any)=>{
        if(response.success ==1) {  
          var self =this;  
          this.dataListing = response.data
          this.loading=false;
        } else {
          this.dataListing=[];
          this.loading=false;
        }
      }), (error) => { this.loading =false; });
    }



    redirect(item:any,type:any){      
      if(type ==1){
        if(this.currentUrl=='/category'){
          localStorage.setItem('pza_cat_content',JSON.stringify(item));
          this.router.navigate(['/category-edit']);
        } else {
          localStorage.setItem('pza_sub_content',JSON.stringify(item));
          this.router.navigate(['/sub-category-edit']);
        }
      } else if(type==2){
        if(this.currentUrl=='/category'){
        localStorage.setItem('pza_cat_content',JSON.stringify(item));
        this.router.navigate(['/sub-category']);
        } else {
          
        }
      } else {

      }
     
    }

}
