import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})

export class ChangepasswordComponent {
  public loading:boolean = false;
  public submitted:boolean = false;
  selectedFile:any;
  public loginDetail:any =[];
  
  ResetData = new FormGroup({
    old_password:new FormControl('',Validators.compose([
      Validators.required,Validators.minLength(8),
      Validators.maxLength(30) ,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&#.])[A-Za-z\\d$@$!%*?&#.]{8,30}')    ])),
    password:new FormControl('',Validators.compose([
      Validators.required,Validators.minLength(8),
      Validators.maxLength(30),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&#.])[A-Za-z\\d$@$!%*?&#.]{8,30}')      ])),
    cpassword:new FormControl('',Validators.compose([
      Validators.required,Validators.minLength(8),
      Validators.maxLength(30) ,
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&#.])[A-Za-z\\d$@$!%*?&#.]{8,30}')     ])),
  })
  
   // convenience getter for easy access to form fields
   get f() { return this.ResetData.controls; }

   constructor(public router: Router, public service: GlobalService) {
    this.loginDetail = JSON.parse(localStorage.getItem('pza_login') || "{}");
    }

   ngOnInit(): void {
   }

  Onsubmit(){
    this.loading=true;
    this.submitted = true;
    let userDetail = this.ResetData;
    if(userDetail.value.cpassword != userDetail.value.password){
      this.service.dangerAlert('Password not match');
      this.loading=false;
       return ;
    } else {
      if(userDetail.valid){ 
        this.loading = true;
        this.submitted = false; 
        let url="/auth/change-password";
        let detail = 
        {
          "confirmPassword": userDetail.value.cpassword,
          "newPassword": userDetail.value.password,
          "currentPassword":userDetail.value.old_password
        };
        this.service.updateApi(detail,url).subscribe(((response:any)=>{
          if(response.success ==1){
            this.service.successAlert(response.message);
            this.submitted = false;
            this.ResetData.reset();
            this.router.navigate(['/signin']);
            this.loading = false;
          } else {
            this.service.dangerAlert(response.message);
            this.loading = false;
          }
        }))
      } else{
        this.loading=false;
        window.scroll(0,0);
      }
    } 
  }

  showHide(str: any) {
    var input = $($(str).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
      $(str).removeClass("bx bx-low-vision");
      $(str).addClass("bx bx-show ");
    } else {
      input.attr("type", "password");
      $(str).removeClass("bx bx-show ");
      $(str).addClass("bx bx-low-vision");
    }
  }
}