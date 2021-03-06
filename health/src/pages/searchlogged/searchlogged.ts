import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetdoctorsProvider } from '../../providers/getdoctors/getdoctors';
import { ShareProvider } from '../../providers/share/share';
import { CalendarPage } from '../calendar/calendar';

@IonicPage()
@Component({
  selector: 'page-searchlogged',
  templateUrl: 'searchlogged.html',
})
export class SearchloggedPage {

 
  docs:any[]= [];
   
   city:string='';
   specialty:string='';
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataservice: GetdoctorsProvider, public share: ShareProvider) {
   
   
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
  	this.navCtrl.push(CalendarPage);

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchloggedPage');
  }

}
