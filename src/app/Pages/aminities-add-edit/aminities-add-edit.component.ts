import { Component ,ElementRef} from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
declare var $:any;


@Component({
  selector: 'app-aminities-add-edit',
  templateUrl: './aminities-add-edit.component.html',
  styleUrls: ['./aminities-add-edit.component.scss']
})
export class AminitiesAddEditComponent {

  public loading:boolean = false;
  public submitted:boolean = false;
  public currentdetail:any=[];
  public selectedFile: any = "";
  public userUpdatedImage: any;
  public imagePath: any;
  imgURL: any = "";
  public currentUrl:any=this.router.url;

  aminityData = new FormGroup({
    name:new FormControl('',Validators.compose([
      Validators.required ])), 
  })
  
   get f() { return this.aminityData.controls; }

  constructor(private el: ElementRef,public router: Router, public service: GlobalService) { 
    if(this.currentUrl == '/amenities-edit'){ 
      this.currentdetail = JSON.parse(localStorage.getItem('pza_content')|| '{}');
      this.imgURL= this.currentdetail.icon;
    }

  }

  ngOnInit(): void {
  }


  Onsubmit(){
    this.submitted = true;    
      let userdetail:any = this.aminityData;
      var url="";     
      if(userdetail.valid){
        this.loading=true;      
        var detail={"name": userdetail.value.name};
        if(this.currentUrl == '/amenities-add'){ 
          url="/amenities/add";
          this.service.PostApis(detail,url).subscribe(((response:any)=>{
            if(response.success ==1){           
              this.aminityData.reset();
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
          url="/amenities/"+this.currentdetail._id;
          this.service.updateApi(detail,url).subscribe(((response:any)=>{
            if(response.success ==1){           
              this.aminityData.reset();
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

}
