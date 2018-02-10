import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewclientPage } from './newclient';

@NgModule({
  declarations: [
    NewclientPage,
  ],
  imports: [
    IonicPageModule.forChild(NewclientPage),
  ],
})
export class NewclientPageModule {}
