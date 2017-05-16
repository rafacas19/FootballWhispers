import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { SearchMenu } from '../search-menu/search-menu';
import { TweetService } from '../../app/services/tweets.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tweetsAvailable:boolean;
  tweets:any;
  title:any;
  message:any;
  player:any;

  constructor(public navCtrl: NavController, public popoverController: PopoverController, private tweetService:TweetService) {
    this.tweets = []
    this.title = "No title yet";
    this.message = "No message yet";
    this.player = "No player selected";
    this.tweetsAvailable = false;
  }

  ngOnInit() {
    this.initialReq();
  }

  initialReq() {
    this.tweetService.getMain().then(response => {
      this.tweets = response.tweets;
      this.title = response.title;
      this.message = response.message;
      this.player = response.player;
    });
  }

  openSearchBar(myEvent) {
    let popover = this.popoverController.create(SearchMenu, {"tweets":this.tweets, "title":this.title, "message":this.message, "player":this.player})
    popover.present({
      ev: myEvent
    })
    popover.onDidDismiss((data) => {
      this.tweets = data.tweets;
      this.title = data.title;
      this.message = data.message;
      this.player = data.player;
      if(this.tweets.length > 0 ){
        this.tweetsAvailable = true
      } else {
        this.tweetsAvailable = false
      }
    });
  }

}
