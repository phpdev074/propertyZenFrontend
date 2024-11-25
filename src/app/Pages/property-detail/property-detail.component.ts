import { Component } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent {

  public loading:boolean = false;
  public submitted:boolean = false;
  public currentdetail:any=[];
  public selectedFile: any = "";
  public userUpdatedImage: any;
  public imagePath: any;
  imgURL: any = "";
  public currentUrl:any=this.router.url;
  public totalCount: number = 0;
  public p = 1;
  public pageLimit = 10;
  public previousLabel:any='';
  public nextLabel:any='';
  public unitList:any=[];
  public aminityList:any=[];
  public viewshow:boolean=false;


  constructor(public router: Router, public service: GlobalService) { 
    var mm:any = JSON.parse(localStorage.getItem('pza_content')|| '{}');
    // this.currentdetail.apartments.filter
    this.getDetail(mm._id);
  }

  ngOnInit(): void {
  }

  viewdetail(type:any,data:any){
    if(type==1){
      this.unitList= data;
    } else{
      this.aminityList=data;
    }
  }

  getDetail(page:any){
    this.loading=true;
    var url='/property/'+page; 
    this.service.GetApi(url).subscribe(((response:any)=>{
      if(response.success ==1) {  
        var self =this; 
        this.currentdetail=response.data ;
        this.loading=false;
        this.viewshow=true;
      } else {
        this.currentdetail=[];
        this.loading=false;
      }
    }), (error) => { this.loading =false; });
  }
 }
