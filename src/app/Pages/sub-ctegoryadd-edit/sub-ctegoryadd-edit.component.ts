import { Component ,ElementRef} from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-sub-ctegoryadd-edit',
  templateUrl: './sub-ctegoryadd-edit.component.html',
  styleUrls: ['./sub-ctegoryadd-edit.component.scss']
})
export class SubCtegoryaddEditComponent {

  public loading:boolean = false;
  public submitted:boolean = false;
  public currentdetail:any=[];
  public selectedFile: any = "";
  public userUpdatedImage: any;
  public imagePath: any;
  imgURL: any = "";
  public currentUrl:any=this.router.url;
  public ParentId:any='';

  categoryData = new FormGroup({
    name:new FormControl('',Validators.compose([
      Validators.required ])), 
    status:new FormControl('')
  })
  
   get f() { return this.categoryData.controls; }

  constructor(private el: ElementRef,public router: Router, public service: GlobalService) {     
    if(this.currentUrl == '/sub-category-edit'){ 
      var mm= JSON.parse(localStorage.getItem('pza_cat_content')|| '{}');
      this.ParentId =mm._id;
      this.currentdetail = JSON.parse(localStorage.getItem('pza_sub_content')|| '{}');
      this.imgURL= this.currentdetail.icon;
    } else  if(this.currentUrl == '/sub-category-add'){
      var mm= JSON.parse(localStorage.getItem('pza_cat_content')|| '{}');
      this.ParentId =mm._id; 
    } else if(this.currentUrl == '/category-edit' ){ 
      var mm= JSON.parse(localStorage.getItem('pza_content')|| '{}');
      this.ParentId =mm._id;
      this.currentdetail = JSON.parse(localStorage.getItem('pza_cat_content')|| '{}');
      this.imgURL= this.currentdetail.icon;
    } else {
      var mm= JSON.parse(localStorage.getItem('pza_content')|| '{}');
      this.ParentId =mm._id;
    }
  }

  ngOnInit(): void {
  }

  Onsubmit(){
    this.submitted = true;    
      let userdetail:any = this.categoryData;
      var url="";
      let formdata= new FormData();
      if(this.imgURL == ''){
        this.service.dangerAlert('Please upload the image');
        return
      } else {
        if(this.selectedFile!=''){
          formdata.append('icon',this.selectedFile);
        }
      }     
      if(userdetail.valid){
        this.loading=true;      
        formdata.append("name", userdetail.value.name);       
        if(this.currentUrl == '/sub-category-add' || this.currentUrl == '/category-add' ){ 
          formdata.append("parentId", this.ParentId);
          url="/services/sub-service";
          this.service.PostApiFormData(formdata,url).subscribe(((response:any)=>{
            if(response.success ==1){           
              this.categoryData.reset();
              this.submitted = false;  
              this.loading=false; 
              this.service.back(); 
            } else {
              this.service.dangerAlert(response.message);
              this.loading=false;
            }
          }), (error:any) => {
            this.loading=false;
          });
        } else {
          formdata.append("status", userdetail.value.status); 
          url="/services/"+this.currentdetail._id;
          this.service.updateFormData(formdata,url).subscribe(((response:any)=>{
            if(response.success ==1){           
              this.categoryData.reset();
              this.submitted = false;  
              this.loading=false; 
              this.service.back(); 
            } else {
              this.service.dangerAlert(response.message);
              this.loading=false;
            }
          }), (error:any) => {
            this.loading=false;
          });
        }
       
      } else{
        this.loading = false
        userdetail.markAllAsTouched();
        this.scrollToFirstInvalidControl();  
      }
  }

  
  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      "form .ng-invalid"
    );
    // firstInvalidControl.focus(); //without smooth behavior
    window.scroll({
      top: this.getTopOffset(firstInvalidControl),
      left: 0,
      behavior: "smooth"
    });
  }
  
  private getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 50;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }

  getUploadFileDetail(event: any) {
    //this.imageChangedEvent = event;
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.service.dangerAlert("Only images are supported.");
        return;
      }
      var reader = new FileReader();
      this.imagePath = event.target.files;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }
  
  changeImage() {
    $("#file1").trigger("click");
  }
  
  
}
