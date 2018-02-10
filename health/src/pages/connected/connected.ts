import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ViewController  } from 'ionic-angular';
import {DisponibilityPage} from '../disponibility/disponibility';
import { GetdoctorsProvider } from '../../providers/getdoctors/getdoctors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import{ ShareProvider } from '../../providers/share/share';


@IonicPage()
@Component({
  selector: 'page-connected',
  templateUrl: 'connected.html',
})



export class ConnectedPage {
   
   form;
  
  firstname: string;
  

  lastname: string;
  adress:string;
  city: string;
  specialty: string;
  email:string;
  password:string;


    user = { firstname: '', lastname: '', email: '', password: '',adress:'', city:'', specialty:''};


  constructor(public navCtrl: NavController, public navParams: NavParams, public share: ShareProvider, public viewCtrl: ViewController ,public dataservice: GetdoctorsProvider, private alertCtrl: AlertController) {
  this.lastname=this.dataservice.getloglname();
  this.firstname=this.dataservice.getlogfname();

  
  }

  ngOnInit(){
    this.form = new FormGroup({
     firstname: new FormControl(this.dataservice.getlogfname(),Validators.pattern('[\\w\\-\\s\\/]+')),
     lastname: new FormControl(this.dataservice.getloglname(),Validators.pattern('[\\w\\-\\s\\/]+')),
     city: new FormControl(this.dataservice.getlogcit()),
     email: new FormControl(this.dataservice.getlogmail()),
     password: new FormControl(this.dataservice.getlogpass(),Validators.minLength(6)),
     specialty: new FormControl(this.dataservice.getlogspec()),
     adress: new FormControl(this.dataservice.getlogaddr()),
     
     
    });
  }
   
  onSubmit(user){
  console.log(user);
  
  
  this.dataservice.editdoc(user).then((result) => {
    {console.log(result);
              let alert=this.alertCtrl.create({
              title:''+'Changes Saved',
              //subTitle:'You will have to wait for doctor appointment\'s confirmation',
              buttons: 
              [
              {
                text: 'Ok',
                role:'cancel',
              }
              ]
              });
              alert.present();
    }
    
  }, (err) => {
    console.log(err);
  });
  
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectedPage');
  }

  onLoadcalendar(){
  	this.navCtrl.push(DisponibilityPage);
  }



}
