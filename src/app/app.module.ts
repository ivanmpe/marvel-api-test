import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxMaskIonicModule } from 'ngx-mask-ionic'
import { AngularFireDatabaseModule } from '@angular/fire/database';


var config = {
  apiKey: "AIzaSyDYA7TQ45ztlFvRe1HurGXDp_2u9uvupfc",
  authDomain: "marvel-ivan.firebaseapp.com",
  databaseURL: "https://marvel-ivan.firebaseio.com",
  projectId: "marvel-ivan",
  storageBucket: "",
  messagingSenderId: "923307006090",
  appId: "1:923307006090:web:7ce5e16655114f0c"
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    NgxMaskIonicModule.forRoot(),
    HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
