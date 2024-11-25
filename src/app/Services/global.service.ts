import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, NavigationExtras, NavigationEnd } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { retry, catchError , map} from "rxjs/operators";
import { Subject } from "rxjs";
import { Location } from "@angular/common";
import { ToastrManager } from "ng6-toastr-notifications"
// import * as moment from "moment";
import *  as moment from 'moment-timezone';
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public currency:any='$';
  
  baseUrl =  `${environment.apiEndPoint}`;

  public giverSelectedUser = new Subject<any>();
  private currentUser: any = {};
  private subject = new Subject<any>();
  public currYear = new Date().getFullYear();
  public Language: any;
  public monthArray: any = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  public dayArray :any=['Sun','Mon','Tue','wed','Thu','Fri','Sat'];
  public LimitArray:any=[10,20,50,100];
  
  constructor(
    public http: HttpClient,
    private router: Router,
    private location: Location,
    public toastr: ToastrManager,
  ) {}

  // Http Options
  getHeaderLogin(type = 2) {
    var data:any = "";
    if (localStorage.getItem('pza_token')) {
      data = localStorage.getItem('pza_token');
    }
    if (type == 1) {
      return {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "authorization": 'Bearer '+ data,
          "device-type": "Browser",
          "device-token": "8749",
          "Version": "1.0.0",
          "time-zone":moment.tz.guess(),
          "Accept-Language":'en',
        }),
      };
    } else {
      return {
        headers: new HttpHeaders({
          "authorization": 'Bearer '+ data,
          "device-type": "Browser",
          "device-token": "8749",
          "Version": "1.0.0",
          "time-zone":moment.tz.guess(),
          "Accept-Language":'en',
        }),
      };
    }
  }
  // Http Options
  getHeadersLogin() {
    var data :any= "";
    if (localStorage.getItem('pza_token')) {
      data = localStorage.getItem('pza_token');
    }
    return {
      headers: new HttpHeaders({
        //'Content-Type' : 'application/json, text/plain, */*',
        "authorization": 'Bearer '+ data,
        "device-type": "Browser",
        "device-token": "8745",
        "Version": "1.0.0",
        "time-zone":moment.tz.guess(),
          "Accept-Language":'en',
        // 'lat':lat,
        // 'long':lang,
        // 'userid':currentUserId,
        // 'parentId':parentid,
        // 'timeZone':moment.tz.guess(),
        // 'timeZoneOffset':'',
        // 'role':role_id,
      }),
    };
  }

  setSubject(obj: any) {
    this.subject.next({ loginData: obj });
  }

  back() {
    this.location.back();
  }

  forword() {
    this.location.forward();
  }

  logOut() {
    var arr: any = [];
    const value: any = localStorage;    
    for (var i = 0; i < value.length; i++) {
      if (value.key(i).substring(0, 4) == 'pza_') {
        if (value.key(i) != 'pza_Remember') {
          arr.push(value.key(i));
        }
      }
    }
    for (var i = 0; i < arr.length; i++) {
      value.removeItem(arr[i]);
    }
    this.router.navigate(['/signin']);
  }

  /*
   * return data array
   */
  getSubject(): Observable<any> {
    return this.subject
      .asObservable()
      .pipe(retry(0), catchError(this.handleError))
  }

  // Common post api
  PostApis(data: any, url: any) {
    return this.http
      .post<any>(this.baseUrl + url, data, this.getHeaderLogin(1))
      .pipe(retry(0), catchError(this.handleError),
      map((data: []) => {
      const response: any = data;
      if (response.success== 0) {
        if (response.error_code == 461) {
          // this.dangerAlert(response.message);
          this.logOut();
          this.router.navigate(['/signin']);
        }
      }
    
      return data;
    }))
  }

  PostApiFormData(data: any, url: any) {
    return this.http
      .post<any>(this.baseUrl + url, data, this.getHeaderLogin(2))
      .pipe(retry(0), catchError(this.handleError),
      map((data: []) => {
      const response: any = data;
      if (response.success == 0) {
        if (response.error_code == 461) {
          // this.dangerAlert(response.message);
          this.logOut();
          this.router.navigate(['/signin']);
        }
      }
      return data;
    }))
  }

  // Common get api
  GetApi(url: any) {
    return this.http
      .get<any>(this.baseUrl + url, this.getHeaderLogin())
      .pipe(retry(0), catchError(this.handleError),
      map((data: []) => {
      const response: any = data;
      if (response.success == 0) {
        if (response.error_code == 461) {
          // this.dangerAlert(response.message);
          this.logOut();
          this.router.navigate(['/signin']);
        }
      }
    
      return data;
    }))
  }

  // Common get api
  DeleteApi(url: any) {
    return this.http
      .delete<any>(this.baseUrl + url, this.getHeaderLogin())
      .pipe(retry(0), catchError(this.handleError),
      map((data: []) => {
      const response: any = data;
      if (response.success== 0) {
        if (response.error_code == 461) {
          // this.dangerAlert(response.message);
          this.logOut();
          this.router.navigate(['/signin']);
        }
      }
   
      return data;
    }))
  }

  updateApi(data: any, url: any){
    return this.http
      .patch<any>(this.baseUrl + url, data, this.getHeaderLogin(1))
      .pipe(retry(0), catchError(this.handleError),
      map((data: []) => {
      const response: any = data;
      if (response.success== 0) {
        if (response.error_code == 461) {
          // this.dangerAlert(response.message);
          this.logOut();
          this.router.navigate(['/signin']);
        }
      }
    
      return data;
    })) 
  }

  updateFormData(data: any, url: any) {
    return this.http
      .patch<any>(this.baseUrl + url, data, this.getHeaderLogin(2))
      .pipe(retry(0), catchError(this.handleError),
      map((data: []) => {
      const response: any = data;
      if (response.success == 0) {
        if (response.error_code == 461) {
          // this.dangerAlert(response.message);
          this.logOut();
          this.router.navigate(['/signin']);
        }
      }
    
      return data;
    }))
  }

  handleError(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  // successAlert for fire toast/...
  successAlert(msg: any) {
    this.toastr.successToastr(msg, " ", {
      position: "top-right",
      toastTimeout:2000
    });
  }

  warningAlert(msg: any) {
    this.toastr.warningToastr(msg, " ", {
      position: "top-right",
      toastTimeout:2000
    });
  }

  // successAlert for fire toast/...
  dangerAlert(msg: any) {
    this.toastr.errorToastr(msg, " ", {
      position: "top-right",
      toastTimeout:2000
    });
  }

  // convert date in (yyyy-mm-dd)
  ToDate(date: any) {
    var day = date.toString().slice(4, 15);
    var day1 = day.split(" ");
    var newmonth =
      this.monthArray.findIndex((rank: any) => rank === day1[0]) + 1;
    if (newmonth < 10) {
      newmonth = "0" + newmonth;
    }
    // var dob = day1[2] + "-" + newmonth + "-" + day1[1];
    var dob = day1[1] + "-" + newmonth + "-" + day1[2];

    return dob;
  }

  // convertDate(date: any) {
  //   return moment(date).format("YYYY-MM-DD");
  // }

  checkStringLength(content: string) {
    return content == undefined ? false : true;
  }

  toTimestamp(strDate:any){
    var date = new Date(strDate);
    return date
  }

  ExpiryCheck(month:any,year:any){
    var today = new Date();
      var currYear = today.getFullYear();
      var months =  today.getMonth() + 1;
      // var newmonth:any;
      // if(months < 10){
      //   newmonth = '0'+ months;
      // }
      if((month < months && year <=  currYear )||  year <  currYear) {
        // this.dangerAlert('Expiry Month & Year is not valid')
        return false;
      } else{
        return 1;
      }
  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  dateConvert(Dates:any,type:any){
    var event_date_start_utc1;
    event_date_start_utc1 = new Date(Dates*1000);
    var hours:any = event_date_start_utc1.getHours();
    var minutes:any = event_date_start_utc1.getMinutes();
    var newformat = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var date :any = event_date_start_utc1.getDate();
    if(date < 10){
      date = '0'+ date;
    }
    var month = event_date_start_utc1.getMonth();
    var months = month +1;
    var year = event_date_start_utc1.getFullYear();
    var day = event_date_start_utc1.getDay();
    if(type == 1){
      var newdate = date+'/'+months +'/'+ year;
      return  newdate;
    } else if(type == 2){
      var newdate = this.dayArray[day]+' '+this.monthArray[month] +' '+   date +' '+ year;
      return  newdate;
    } else  if(type == 3){
      var newdate = date+' '+this.monthArray[month] +' '+ year;
      return  newdate;
    } else if(type == 4){
      var jj = Dates.split('-');
      var kk = parseInt(jj[1])-1;
      var newdate = jj[0]+' '+this.monthArray[kk] +', '+ jj[2];
      return  newdate;
    } else {
      var newdate = date+'/'+months +'/'+ year +' ' + hours + ':' + minutes + ' ' + newformat;
      return  newdate;
    }
  }

  dateCon(date:any){
    var mm =date.split('T');
    return mm[0];
  }

  timeago(date:any){
    var s:any=new Date();
    const seconds = Math.floor((s - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + ' years ago';
    }  
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + ' months ago';
    }  
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + ' days ago';
    }  
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + ' hours ago';
    }  
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + ' minutes ago';
    }  
    if(seconds < 10) return 'just now';  
    return Math.floor(seconds) + ' seconds ago';
  }

  dateTImeCon(date:any,type:any){
    var kk:any=''
    if(type==1){
      var day = date.toString().slice(16, 24);
      kk=day;
    } else {
      var mm =date.split('T');
      kk=mm[1];
    }
    var jj= kk.split(':')
    var hoursEnd = jj[0] < 10 ? "0" + jj[0] : jj[0];
    var minutes = jj[1] < 10 ? "0" + jj[1] : jj[1];
    var am_pm = jj[0] >= 12 ? "PM" : "AM";
    if(type ==1){
      var time = jj[0] + ":" + jj[1] + ' '+ am_pm;
    } else {
      var time = jj[0] + ":" + jj[1] + ":00 " ;
    }  
    return time;
  }

      // Time conversion UTC
      timeConvert(times:any){
        //   convertUTCToLocalTime(timestamp : Long, mDateFormat : String ) : String
        // {
        // val value = Date(timestamp * 1000)
        // val dateFormatter = SimpleDateFormat(mDateFormat, Locale.ENGLISH)
        // dateFormatter.timeZone = TimeZone.getDefault()
        // return dateFormatter.format(value)
        // }
          // var event_date_end_utc = new Date(times*1000);
          // var hoursEnd = event_date_end_utc.getHours() < 10 ? "0" + event_date_end_utc.getHours() : event_date_end_utc.getHours();
          // var minutes = event_date_end_utc.getMinutes() < 10 ? "0" + event_date_end_utc.getMinutes() : event_date_end_utc.getMinutes();
          // var seconds = event_date_end_utc.getSeconds() < 10 ? "0" + event_date_end_utc.getSeconds() : event_date_end_utc.getSeconds();
          // var time = hoursEnd + ":" + minutes ;
          // return time;
      
      
      
      
          var event_date_start_utc = new Date(times*1000);
          var hours = event_date_start_utc.getHours() > 12 ? event_date_start_utc.getHours() - 12 : event_date_start_utc.getHours();
          var am_pm = event_date_start_utc.getHours() >= 12 ? "PM" : "AM";
          var hoursEnd = hours < 10 ? "0" + hours : hours;
          var minutes = event_date_start_utc.getMinutes() < 10 ? "0" + event_date_start_utc.getMinutes() : event_date_start_utc.getMinutes();
          var seconds = event_date_start_utc.getSeconds() < 10 ? "0" + event_date_start_utc.getSeconds() : event_date_start_utc.getSeconds();
          var time = hoursEnd + ":" + minutes + " " + am_pm;
          return time;
      
          //var tz = moment.tz.guess();
            // var zoneArea = moment.tz.guess();
            // const time = moment.unix(times).tz(zoneArea).format('LT');
            // return time;
          //let info = moment.unix(times);
          //info.tz(tz).format('LT');
          // var hours = event_date_start_utc.getHours() > 12 ? event_date_start_utc.getHours() - 12 : event_date_start_utc.getHours();
          // var am_pm = event_date_start_utc.getHours() >= 12 ? "PM" : "AM";
          // var hoursEnd = hours < 10 ? "0" + hours : hours;
          // var minutes = event_date_start_utc.getMinutes() < 10 ? "0" + event_date_start_utc.getMinutes() : event_date_start_utc.getMinutes();
          // var seconds = event_date_start_utc.getSeconds() < 10 ? "0" + event_date_start_utc.getSeconds() : event_date_start_utc.getSeconds();
          // var time = hoursEnd + ":" + minutes + " " + am_pm;
          // return time;
        }
}

