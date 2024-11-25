import { Component,ElementRef } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
declare var $:any;


@Component({
  selector: 'app-building-add-edit',
  templateUrl: './building-add-edit.component.html',
  styleUrls: ['./building-add-edit.component.scss']
})
export class BuildingAddEditComponent {

  public loading:boolean = false;
  public submitted:boolean = false;
  selectedFile:any;
  public rememberCheck : boolean = false ;
  public email : any ;
  public password : any;

  loginData = new FormGroup({
    email:new FormControl('',Validators.compose([
      Validators.required, Validators.email  ])),
    password:new FormControl('',Validators.compose([
      Validators.required,Validators.minLength(8),
      Validators.maxLength(30) ,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&#.])[A-Za-z\\d$@$!%*?&#.]{8,30}') 
    ])),
  })
  
   get f() { return this.loginData.controls; }

  constructor(private el: ElementRef,public router: Router, private service: GlobalService) { 
    if(localStorage.getItem('pza_Remember')){
      var data = JSON.parse(localStorage.getItem('pza_Remember')|| '{}');
      this.email = data.email;
      this.password = data.password;
      this.rememberCheck = data.check;
    }
  }

  ngOnInit(): void {
  }


  Onsubmit(){
    this.submitted = true;    
      let userdetail = this.loginData;
      if(userdetail.valid){
        this.loading=true;
        var url="/login";
        var detail={"email": (userdetail.value.email)?.toLowerCase(),"password": userdetail.value.password};
        this.service.PostApis(detail,url).subscribe(((response:any)=>{
          if(response.success ==1){
            if(this.rememberCheck){
              var detail = {'email':(userdetail.value.email)?.toLowerCase(),'password':userdetail.value.password,'check':this.rememberCheck}
              localStorage.setItem('pza_Remember',<any> JSON.stringify(detail));
            } else {
              localStorage.removeItem('pza_Remember');
            } 
            localStorage.setItem('pza_login',<any> JSON.stringify(response.data));
            this.service.setSubject(response.data);
            localStorage.setItem('pza_token',response.data.token);
            if(response.data.firstTimeLogin == false){
              localStorage.setItem('pza_first','1');  
              this.router.navigate(['/dashboard']);            
            } else {
              if(response.data.profile_complete ==false){
                this.router.navigate(['/edit-profile']);
              } else {
                this.router.navigate(['/dashboard']);
              } 
            }
            this.loginData.reset();
            this.submitted = false;  
            this.loading=false;  
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
