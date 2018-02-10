import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewclientPage } from '../newclient/newclient';
import { SigninPage } from '../signin/signin';
import { SearchPage } from '../search/search';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import{ConnectedPage} from '../connected/connected';
import { GetdoctorsProvider } from '../../providers/getdoctors/getdoctors';
import{ ShareProvider } from '../../providers/share/share'
import {WelcomePage} from '../welcome/welcome';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  form;
  email:string;
  password:string;
  docpatient: string;
  docs:any[]= [];
  servermail:string;
  severpass:string;
  error: string;
   bool: number=0;

  constructor(public navCtrl: NavController, public dataservice: GetdoctorsProvider, public share: ShareProvider) {
  
  }


  ngOnInit(){
    this.form = new FormGroup({
     email: new FormControl("",Validators.required),
     password: new FormControl("",Validators.required),
     docpatient: new FormControl("",Validators.required)
    });
  }

  
  onSubmit(user){
  console.log(user);
  console.log("email: "+user.email+" pass: "+user.password);
  this.dataservice.setData(user.email,user.password);
  console.log("email: "+this.dataservice.getemail());

  this.dataservice.getuser(user.docpatient).subscribe((data)=>
      {//console.log(JSON.stringify(data)); //console.log(data);
                this.docs=[];
                 var index=0;
                //this.docs=data;
                for(index=0;index<data['user'].length;++index)
                {
                  this.docs.push(data['user'][index]);
                }
                //this.docs=data['recordset'];
                console.log(data);
                console.log("docs" +this.docs);
                console.log(JSON.stringify(this.docs)); 
                
                console.log("password"+this.docs[0].password);       
                this.servermail= this.docs[0].email;
                this.severpass= this.docs[0].password;
                if (user.email==this.servermail && user.password==this.severpass && user.docpatient=='doc')
                  {this.navCtrl.push(ConnectedPage);
                    this.share.setsearch(1);
                    this.dataservice.setlogin(this.docs[0].firstname,this.docs[0].lastname,this.docs[0].city,this.docs[0].specialty,this.docs[0].email,this.docs[0].password,this.docs[0].id,this.docs[0].adress,this.docs[0].dispo);
                  }
                console.log('docpatient got: '+user.docpatient);
                if (user.email==this.servermail && user.password==this.severpass && user.docpatient=='patient')
                  {this.navCtrl.push(WelcomePage);
                  this.dataservice.setlogin(this.docs[0].firstname,this.docs[0].lastname,'','',this.docs[0].email,this.docs[0].password,this.docs[0].id,'','');
                  }             
        }); 
  //console.log("getuser: "+this.servermail+" and: "+this.severpass);
  

  }


  onLoadNewAccount(){
  	this.navCtrl.push(NewclientPage);
  }

  onLoadsignin(){
  	this.navCtrl.push(SigninPage);
  }
  onLoadSearch(){
  	this.navCtrl.push(SearchPage);
  }



  /*onLoadConnect(){
    this.navCtrl.push(ConnectedPage);
    
  }*/
  




  
}
