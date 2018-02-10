import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from';
import 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';


@Injectable()
export class ShareProvider {

  	city:string;
  	specialty:string;
    
    registerfname:string;
    registerlname: string;
    registermail:string;
    registerpass:string;
    registerdoc:string;

    search:number;

    docinfo_first:string;
    docinfo_last:string;
    docinfo_city:string;
    docinfo_adress:string;
    docinfo_specialty:string;
    docinfo_email:string;
    docinfo_dispo:string;


    clickdocid: string;
    clickdocname: string;
    clickdocdispo: string;

    
    appointpatid: string;

  constructor(public http: Http){
    this.city = "";
    this.specialty = "";
  }

  
  setappointpatid(patid){ this.appointpatid=patid;}
  
  getappointpatid(){return this.appointpatid;}


  setdocclick(id,fname,lname,dispo){
    this.clickdocdispo=dispo;
    this.clickdocname=lname+" "+fname;
    this.clickdocid=id;
  }

  getclickdocid(){
    return this.clickdocid;
  }

  getclickdocname(){
    return this.clickdocname;
  }

  getclickdocdispo(){
    return this.clickdocdispo;
  }


  setdocinfo(first,last,dcity,adress,dspecialty,email,dispo)
  {
    this.docinfo_first=first;
    this.docinfo_last=last;
    this.docinfo_city=dcity;
    this.docinfo_adress=adress;
    this.docinfo_specialty=dspecialty;
    this.docinfo_email=email;
    this.docinfo_dispo=dispo;

  }

  getdispo(){
    return this.docinfo_dispo;
  }

  getfirst(){
    return this.docinfo_first;
  }

  getlast(){
    return this.docinfo_last;
  }



  
  setregister(fname,lname,mail,pass,doc){
    this.registerfname= fname;
    this.registerlname= lname; 
    this.registermail= mail;
    this.registerpass= pass;
    this.registerdoc=doc;  
     }

  getregfname(){
   return this.registerfname;
  }
  getreglname(){
   return this.registerlname;
  }
  getregmail(){
   return this.registermail;
  }
  getregpass(){
   return this.registerpass;
  }
    getregdoc(){
   return this.registerdoc;
  }


  setData (cidata,spdata) {
    this.city = cidata;
    this.specialty = spdata;
  }
  getci () {
    return this.city;
  }

  getsp(){
  	return this.specialty;
  }


  setsearch(s){
    this.search=s;
  }

  getsearch(){
    return this.search;
  }



editdoc(data,mail)
{
    let headers = new Headers(
   {
      'Content-Type' : 'application/json'
   });
let options = new RequestOptions({ headers: headers });
var url="http://quranontology.cloudapp.net:5000/jsregister?mail="+mail;
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



}