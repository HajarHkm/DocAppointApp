import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { GetdoctorsProvider } from '../../providers/getdoctors/getdoctors';
import { ShareProvider } from '../../providers/share/share';
import { HomePage } from '../home/home';
import { CalendarPage } from '../calendar/calendar';


@IonicPage()
@Component({
  selector: 'page-doctors',
  templateUrl: 'doctors.html',
  providers: [GetdoctorsProvider],

})


export class DoctorsPage {
	
   docs:any[]= [];
   
   city:string='';
   specialty:string='';

   clickdocid: string;
   clickdocdispo: string;
   clickdocname: string;
  

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

  onLoaddis(s){
  this.clickdocid= s.id;
  this.clickdocname=s.firstname+s.lastname;
  this.clickdocdispo=s.dispo;
  this.share.setdocclick(s.id,s.firstname,s.lastname,s.dispo);
  console.log("this is doc we click on: "+this.clickdocname+" his dispo: "+this.clickdocdispo);
  this.navCtrl.push(CalendarPage);
  
  }

}

  





