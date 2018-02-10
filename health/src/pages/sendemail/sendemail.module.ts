import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendemailPage } from './sendemail';

@NgModule({
  declarations: [
    SendemailPage,
  ],
  imports: [
    IonicPageModule.forChild(SendemailPage),
  ],
})
export class SendemailPageModule {}
