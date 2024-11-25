import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/Services/global.service';
import { Router,ActivatedRoute} from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent {
  
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

  constructor(public router: Router, private service: GlobalService) { 
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
        var url="/auth/admin/login";
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
            this.service.setSubject(response.data.user);
            localStorage.setItem('pza_token',response.data.token);          
            this.router.navigate(['/dashboard']);
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
        window.scroll(0,0);
      }
  }

  getCheckType(event:any){
    this.rememberCheck = event.target.checked;
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
