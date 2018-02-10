import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetdoctorsProvider } from '../../providers/getdoctors/getdoctors';
import { SearchPage } from '../search/search';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {DisponibilityPage} from '../disponibility/disponibility';
import { ShareProvider} from '../../providers/share/share';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

 form;
  
  firstname: string;
  lastname: string;
  adress:string;
  city: string;
  specialty: string;
  email:string;
  password:string;

    user = { firstname: '', lastname: '', email: '', password: '',adress:'', city:'', specialty:''};


  constructor(public navCtrl: NavController, public navParams: NavParams, public dataservice: GetdoctorsProvider, public share: ShareProvider) {
  console.log("what i need"+this.share.getregmail());
  }

  ngOnInit(){
    this.form = new FormGroup({
     firstname: new FormControl(this.share.getregfname(),Validators.pattern('[\\w\\-\\s\\/]+')),
     lastname: new FormControl(this.share.getreglname(),Validators.pattern('[\\w\\-\\s\\/]+')),
     city: new FormControl(),
     email: new FormControl(this.share.getregmail()),
     password: new FormControl(this.share.getregpass(),Validators.minLength(6)),
     specialty: new FormControl(),
     adress: new FormControl(),
     dispo: new FormControl()
     
    });
  }
   
  onSubmit(user){
  console.log(user);
  
  this.share.editdoc(user,user.email).then((result) => {
    console.log(result);
  }, (err) => {
    console.log(err);
  });

 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad signin');
  }

    onLoadcalendar(){
    this.navCtrl.push(DisponibilityPage);
  }

 onLoadSearch(){
  this.navCtrl.push(SearchPage);
 }

}

