import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, ModalController } from 'ionic-angular';
import * as moment from 'moment';
import { GetdoctorsProvider } from '../../providers/getdoctors/getdoctors';
import{ ShareProvider } from '../../providers/share/share';




@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
	
	eventSource=[];
	viewTitle: string;
	selectedDay = new Date();
	calendar={
		mode: 'month',
		currentDate: this.selectedDay
	}

  dispo:string;
  docname: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataservice: GetdoctorsProvider, public share: ShareProvider ,private modalCtrl: ModalController, private alertCtrl: AlertController) {
  this.docname=this.share.getclickdocname();
  this.dispo=this.share.getclickdocdispo();
  }

  addEvent(){
   let modal = this.modalCtrl.create('AppointmentPage',{selectedDay: this.selectedDay});
    modal.present();  
     modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = eventData.startTime;
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });


  }

  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  onEventSelected(event){
    
    let start = moment(event.startTime).format('YYYY-MM-DD h:mm:ss');
     //let end = moment(event.endTime).format('YYYY-MM-DD h:mm:ss');
     console.log("here");
     let alert=this.alertCtrl.create({
     	title:''+'Your appointment',
     	subTitle:'At: '+start,
     	buttons: ['OK']
     });
     alert.present();
     console.log("event selected: "+moment(event.startTime).format('YYYY-MM-DD h:mm'));

  }



}
