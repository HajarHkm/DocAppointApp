import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetdoctorsProvider } from '../../providers/getdoctors/getdoctors';
import { ConnectedPage } from '../connected/connected'
@IonicPage()
@Component({
  selector: 'page-disponibility',
  templateUrl: 'disponibility.html',
})
export class DisponibilityPage {
form;
dispo: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataservice: GetdoctorsProvider, private alertCtrl: AlertController) {
 
  }
  ngOnInit(){
    this.form = new FormGroup({
     startday: new FormControl("",Validators.required),
     endday: new FormControl("",Validators.required),
     starttime: new FormControl("",Validators.required),
     endtime:   new FormControl("",Validators.required),
       
    });
    this.dispo= this.dataservice.getlogdispo();
    console.log("supdispo: ",this.dispo);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DisponibilityPage');
  }
  disp={dispo:''};

onSubmit(user){
  console.log(user);
  this.disp.dispo="From "+user.startday+" To "+user.endday+". Time: from "+user.starttime+" till "+user.endtime;
  console.log("dispo:"+this.disp.dispo);
  
  this.dataservice.savedispo(this.disp).then((result) => {
    {console.log(result);
      this.dispo=this.disp.dispo;

    let alert=this.alertCtrl.create({
      title:''+'Schedule saved',
      subTitle:'',
          buttons: ['OK']
     });
     alert.present();

    }
  }, (err) => {
    console.log(err);
  });

  }

  doRefresh(refresher,user) {
    this.dataservice.setdispo(this.dispo);
    setTimeout(() => {
      console.log('Async operation has ended');
      if(refresher !=0)
      refresher.complete();
    }, 2000);
  }
}
