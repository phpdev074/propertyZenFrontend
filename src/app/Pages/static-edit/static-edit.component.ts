import { Component ,ElementRef} from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
declare var $:any;


@Component({
  selector: 'app-static-edit',
  templateUrl: './static-edit.component.html',
  styleUrls: ['./static-edit.component.scss']
})
export class StaticEditComponent {
  
  public loading:boolean = false;
  public submitted:boolean = false;
  public CurrentDetail:any=[];

  staticData = new FormGroup({
    description:new FormControl('',Validators.compose([
      Validators.required ])),
  })
  
   get f() { return this.staticData.controls; }

  constructor(private el: ElementRef,public router: Router, public service: GlobalService) {    
      this.CurrentDetail= JSON.parse(localStorage.getItem('pza_content')|| '{}');
  }

  ngOnInit(): void {
  }


  Onsubmit(){
    this.submitted = true;    
      let userdetail = this.staticData;
      if(userdetail.valid){
        this.loading=true;
        var url="/static-page/"+this.CurrentDetail._id;
        var detail=
        {
          "title": this.CurrentDetail.title,
          "slug": this.CurrentDetail.slug,
          "description": userdetail.value.description
        }
        this.service.updateApi(detail,url).subscribe(((response:any)=>{
          if(response.success ==1){         
            this.staticData.reset();
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
