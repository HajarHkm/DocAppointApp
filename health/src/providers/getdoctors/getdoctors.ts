import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from';
import 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class GetdoctorsProvider 
{
   public doclist: any;
   city:string;
   specialty:string;
   email:string;
   password:string;
   loginfirstname:string;
   loginlastname:string;
   logincity:string;
   loginspecialty:string;
   loginemail:string;
   loginpassword:string;
   loginadress:string;
   loginid:string;

   logindispo:string;
   dispo:string;

  constructor(public http: Http) {
    console.log('hello provider');
  }



   getlogdispo(){
    return this.logindispo;
   }
   getdispo(){
    return this.dispo;
   }
   setdispo(disp){
     this.dispo=disp;
   }
   
   setlogin(fname,lname,cit,spec,mail,pass,id,addr,dispo){
    this.loginfirstname= fname;
    this.loginlastname= lname;
    this.logincity= cit;
    this.loginspecialty= spec;  
    this.loginemail= mail;
    this.loginpassword= pass;
    this.loginid=id;
    this.loginadress=addr;
    this.logindispo=dispo;
   }

   getloginid(){return this.loginid;}
   
  getlogaddr(){
    return this.loginadress;
  }
  
  getlogmail(){
    return this.loginemail;
  }
    getlogpass(){
    return this.loginpassword;
  }

    getlogfname(){
    return this.loginfirstname;
  }
    getloglname(){
    return this.loginlastname;
  }
    getlogcit(){
    return this.logincity;
  }
    getlogspec(){
    return this.loginspecialty;
  }

  setData(emdata,passdata){
    this.email= emdata;
    this.password= passdata;
  }

  getemail(){
    return this.email;
  }

  getpass(){
    return this.password;
  }

  setdata (cidata,spdata) {
    this.city = cidata;
    this.specialty = spdata;
  }
  getci () {
    return this.city;
  }

  getsp(){
    return this.specialty;
  }
  
  getid(){
    return this.loginid;
  }

  loaddata(){
    return this.http.get("http://quranontology.cloudapp.net:5000/doctors?city="+this.getci()+"&specialty="+this.getsp())
    .map(res =>res.json());

 
  }

  loadappoints(docpat){
    return this.http.get("http://quranontology.cloudapp.net:5000/appoints?docpat="+docpat)
    .map(res =>res.json());

 
  }


  getuser(doc){
    return this.http.get("http://quranontology.cloudapp.net:5000/login?doc="+doc+"&email="+this.getemail()+"&password="+this.getpass())
    .map(res =>res.json());
 
  }

duplicate(date,docid)
{
  return this.http.get("http://quranontology.cloudapp.net:5000/duplicate?date="+date+"&docid="+docid)
    .map(res =>res.json());
}

 /*saveUser(data) {
  return new Promise((resolve, reject) => {
    this.http.post('http://localhost:5000/register', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}*/

saveUser(data,docpatient){
  let headers = new Headers(
{
  'Content-Type' : 'application/json'
});
let options = new RequestOptions({ headers: headers });
var url="http://quranontology.cloudapp.net:5000/register?doc="+docpatient;
return new Promise((resolve, reject) => 
{
  this.http.post(url, JSON.stringify(data), options)
  .toPromise()
  .then((response) =>
  {
    console.log('API Response : ', response.json());
    resolve(response.json());
  })
  .catch((error) =>
  {
    console.error('API Error : ', error.status);
    console.error('API Error : ', JSON.stringify(error));
    reject(error.json());
  });
});
}





editdoc(data)
{
    let headers = new Headers(
   {
      'Content-Type' : 'application/json'
   });
let options = new RequestOptions({ headers: headers });
var url="http://quranontology.cloudapp.net:5000/register?id="+this.getid();
return new Promise((resolve, reject) => 
{
  this.http.put(url, JSON.stringify(data), options)
  .toPromise()
  .then((response) =>
    {
       console.log('API Response : ', response.json());
       resolve(response.json());
    })
    .catch((error) =>
    {
      console.error('API Error : ', error.status);
      console.error('API Error : ', JSON.stringify(error));
      reject(error.json());
    });
});

}



savedispo(data)
{
    let headers = new Headers(
   {
      'Content-Type' : 'application/json'
   });
let options = new RequestOptions({ headers: headers });
var url="http://quranontology.cloudapp.net:5000/dispo?id="+this.getid();
return new Promise((resolve, reject) => 
{
  this.http.put(url, JSON.stringify(data), options)
  .toPromise()
  .then((response) =>
    {
       console.log('API Response : ', response.json());
       resolve(response.json());
    })
    .catch((error) =>
    {
      console.error('API Error : ', error.status);
      console.error('API Error : ', JSON.stringify(error));
      reject(error.json());
    });
});

}

saveAppoint(data){
  let headers = new Headers(
{
  'Content-Type' : 'application/json'
});
let options = new RequestOptions({ headers: headers });
var url="http://quranontology.cloudapp.net:5000/appoint";
return new Promise((resolve, reject) => 
{
  this.http.post(url, JSON.stringify(data), options)
  .toPromise()
  .then((response) =>
  {
    console.log('API Response : ', response.json());
    resolve(response.json());
  })
  .catch((error) =>
  {
    console.error('API Error : ', error.status);
    console.error('API Error : ', JSON.stringify(error));
    reject(error.json());
  });
});
}


}