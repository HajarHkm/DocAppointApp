import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { GetdoctorsProvider } from '../../providers/getdoctors/getdoctors';
import{ ShareProvider } from '../../providers/share/share';
import { EmailComposer } from '@ionic-native/email-composer';


@IonicPage()
@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
})
export class AppointmentPage {
  event = { startTime: new Date().toISOString(),endTime: new Date().toISOString() };
  minDate = new Date().toISOString();
  
  data = { docid: '', docpat: '',status:'',date:''};
  constructor(public navCtrl: NavController, public navParams: NavParams, private emailComposer: EmailComposer ,public share: ShareProvider ,public dataservice: GetdoctorsProvider ,public viewCtrl: ViewController, private alertCtrl: AlertController) {
       let preselectedDate = moment(this.navParams.get('selectedDay')).format();
       let start = moment(preselectedDate).format('YYYY-MM-DD hh:mm');
       this.event.startTime = preselectedDate;
       this.event.endTime = this.event.startTime;
       this.data.docid=this.share.getclickdocid();
       this.data.docpat=this.share.getappointpatid();
       this.data.date=start;

       this.data.status='0';
       
  }

  cancel(){
  	this.viewCtrl.dismiss();

  }
  
  
  save(){
        console.log("ids: "+this.share.getclickdocid()+ this.share.getappointpatid());
        console.log("date:"+this.event.startTime);
        let preselectedDate = moment(this.navParams.get('selectedDay')).format();
        let start = moment(preselectedDate).format('YYYY-MM-DD hh:mm');
        this.dataservice.duplicate(start,this.share.getclickdocid()).subscribe((data)=>
          {
            //console.log(JSON.stringify(data));
            console.log(start);
            console.log("data is:"+ data);
            console.log("data.user is:"+data.user);
            console.log("stringify data is: "+JSON.stringify(data));

            if (data.user == null || data.user.length < 1) 
            { 

              this.dataservice.saveAppoint(this.data).then((result) => {
                console.log("results are: "+result);
                }, (err) => {
                console.log(err);
                });


              /*{
                this.emailComposer.isAvailable().then((available: boolean) =>{
                  if(available) {
                    console.log("working");
                    //Now we know we can send
                    }
                  });
                let email = {
                  to: 'hajarhakkoum@gmail.com',
                  cc: '',
                  bcc: [],
                  attachments: [],
                  subject: 'Appointment Request',
                  body: 'Hello Doctor, I would like to get an appointment. Date: ',
                  isHtml: true
                  };
                  this.emailComposer.open(email);
              }*/


              let alert=this.alertCtrl.create({
              title:''+'Mail sent',
              subTitle:'You will have to wait for doctor appointment\'s confirmation',
              buttons: 
              [
              {
                text: 'Cancel',
                role: 'cancel',
              },
              {
                text: 'Ok',
                handler: data => 
                {
                  this.viewCtrl.dismiss(this.event);
                }
              }
              ]
              });
              alert.present();
            }

    else
      {  

        let alert=this.alertCtrl.create({
          title:''+'Date already taken',
          subTitle:'Choose another date',
          buttons: 
          [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Ok',
            role: 'cancel',
          }
          ]
          });
        alert.present(); 
  	  }

    });

  }

}
