import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TweetService } from '../../app/services/tweets.service'
// import { Http } from '@angular/http';

@Component({
  selector: 'page-search-menu',
  templateUrl: 'search-menu.html',
  providers: [TweetService]
})
export class SearchMenu {
  tweets: any;
  constructor(public viewCtrl: ViewController, private tweetService: TweetService) {

  }

  close() {
    this.viewCtrl.dismiss();
  }

  getTweets(value: {player: string, team: string, user: string}) {
    console.log(value.player)
    console.log(this.tweetService.getPosts(value.player, value.team, value.user))
  }

}
