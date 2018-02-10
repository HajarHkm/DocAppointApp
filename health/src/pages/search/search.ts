import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SerachunloggedPage} from '../serachunlogged/serachunlogged';
import {SearchloggedPage} from '../searchlogged/searchlogged';
import{ DoctorsPage } from '../doctors/doctors';

import { ShareProvider } from '../../providers/share/share';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  
})


export class SearchPage {
  

   city:string='';
   specialty:string='';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public share: ShareProvider) {
  

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
   
  }

  onLoadDoctorsList(){
    console.log("the city:"+this.city);
    console.log("the specialty"+this.specialty);
    this.share.setData(this.city,this.specialty);
    //this.navCtrl.push(DoctorsPage);
    if (this.share.getsearch()==1)
    {
      this.navCtrl.push(DoctorsPage);
     this.share.setData(this.city,this.specialty);
    }


    else {
    this.navCtrl.push(SerachunloggedPage);
    this.share.setData(this.city,this.specialty);
    }
    

  }


}

