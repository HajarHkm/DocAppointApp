import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SearchPage} from'../search/search';
import { ShareProvider } from '../../providers/share/share';
import { GetdoctorsProvider } from '../../providers/getdoctors/getdoctors';


@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

    id: string;
    fname:string;
  s=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public share: ShareProvider, public dataservice: GetdoctorsProvider) {
    
     this.s=1;
     this.share.setsearch(this.s);
       this.id=this.dataservice.getloginid();
       this.fname=this.dataservice.getlogfname();
     this.share.setappointpatid(this.id);
  console.log("id taken: "+ this.id);
  this.getappoints();
  }

docs:any[]= [];
  getappoints() {
    
    this.dataservice.loadappoints(this.id).subscribe((data)=>
      {
                 var index=0;

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
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  onLoadSearch(){
  	this.navCtrl.push(SearchPage);
   
  }
}
