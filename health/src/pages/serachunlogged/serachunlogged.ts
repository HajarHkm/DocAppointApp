import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { GetdoctorsProvider } from '../../providers/getdoctors/getdoctors';
import { ShareProvider } from '../../providers/share/share';

import { HomePage } from '../home/home';

/**
 * Generated class for the SerachunloggedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-serachunlogged',
  templateUrl: 'serachunlogged.html',
})
export class SerachunloggedPage {

  docs:any[]= [];
   
   city:string='';
   specialty:string='';
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataservice: GetdoctorsProvider, public share: ShareProvider, private alertCtrl: AlertController) {
   
   
   this.city=this.share.getci();
   this.specialty= this.share.getsp();
   this.dataservice.setdata(this.city,this.specialty);
   console.log("what i need: city: "+this.dataservice.getci()+" and specialty: "+this.dataservice.getsp());
   this.getdocs();

   
  }
   
  getdocs() {
  	
    this.dataservice.loaddata().subscribe((data)=>
    	{
    		//console.log(JSON.stringify(data));
    		//console.log(data);

                 var index=0;
                //this.docs=data;
                for(index=0;index<data['user'].length;++index)
                {
                  this.docs.push(data['user'][index]);
                }
                //this.docs=data['recordset'];
                console.log(data);
                console.log("docs: " +this.docs);
                console.log(JSON.stringify(this.docs));  

        });  
              
  }

  onLoaddis(){
        let alert=this.alertCtrl.create({
      title:''+'You should be logged in to continue',
      subTitle:'Click Ok to sign in or sign up',
          buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Ok',
        handler: data => {
          this.navCtrl.push(HomePage);
        }
      }
    ]
     });
     alert.present();
 
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SerachunloggedPage');
  }

}
