import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { TweetService } from './services/tweets.service'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchMenu } from '../pages/search-menu/search-menu';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchMenu
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchMenu
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TweetService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
