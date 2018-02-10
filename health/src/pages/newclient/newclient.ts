import { Component} from '@angular/core';

import { IonicPage, NavController, NavParams,AlertController, ModalController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetdoctorsProvider } from '../../providers/getdoctors/getdoctors';
import {SigninPage} from '../signin/signin';
import { ShareProvider} from '../../providers/share/share';
import {HomePage} from '../home/home';

export class Client{
	firstname: string;
	lastname: string;
  adress:string;
  city:string;
	email: string;
	password: string;
  specialty:string;
  docpatient:string;
}

@Component({
  selector: 'page-newclient',
  templateUrl: 'newclient.html',
  providers: [GetdoctorsProvider],
})

export class NewclientPage {
 
 form;
 contact: Client={
 	firstname:'',
 	lastname:'',
  adress:'',
  city:'',
 	email:'',
 	password:'',
  specialty:'',
  docpatient:'',
  };

  //profil=['doc','patient'];
 

  testP = "";

  user = { firstname: '', lastname: '', email: '', password: '',city:'', specialty:''};
  
  constructor( public navCtrl: NavController, public navParams: NavParams, public dataservice: GetdoctorsProvider, public share: ShareProvider, private alertCtrl: AlertController) {
   

  }


  ngOnInit(){
    this.form = new FormGroup({
     firstname: new FormControl("",Validators.compose([Validators.required,Validators.pattern('[\\w\\-\\s\\/]+')])),
     lastname: new FormControl("",Validators.compose([Validators.required,Validators.pattern('[\\w\\-\\s\\/]+')])),
     city: new FormControl(""),
     email: new FormControl("",Validators.required),
     password: new FormControl("",Validators.compose([Validators.required,Validators.minLength(6)])),
     specialty: new FormControl(""),
     docpatient: new FormControl("",Validators.required),
     adress: new FormControl("")
     
    });
  }

typeProfil : string ="";

 onSubmit(user){
 	console.log(user);
  this.share.setregister(user.firstname,user.lastname,user.email,user.password,user.docpatient);

  this.dataservice.saveUser(user,user.docpatient).then((result) => {
    console.log(result);
  }, (err) => {
    console.log(err);
  });

  this.dataservice.setlogin(user.firstname,user.lastname,'','',user.email,user.password,'','','');
  
  console.log("what i got "+this.dataservice.getlogmail());

  if (user.docpatient=='doc')
  this.navCtrl.push(HomePage);
  if(user.docpatient=='patient')
    this.navCtrl.push(HomePage);
  let alert=this.alertCtrl.create({
      title:''+'Account created For: '+user.lastname+' '+user.firstname,
      subTitle:'Now sign in to get started!',
      buttons: ['OK']
     });
     alert.present();
 }
 
  /*saveUser(user) {
  this.saveclient.saveUser(user).then((result) => {
    console.log(result);
  }, (err) => {
    console.log(err);
  });
}*/

}
