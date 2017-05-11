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
  tweets:any;
  title:any;
  message:any;

  constructor(public viewCtrl: ViewController, private tweetService: TweetService, private params:NavParams) {
    this.tweets = params.data.twets;
    this.title = params.data.title;
    this.message = params.data.message;
  }

  close() {
    this.viewCtrl.dismiss({"tweets":this.tweets, "title":this.title, "message":this.message});
  }

  getTweets(value: {player: string, team: string, user: string}) {
    console.log(value.player)
    // console.log(this.tweetService.getPosts(value.player, value.team, value.user))
    this.tweetService.getMain().then(response => {
      console.log(response.title);
      // console.log(response.body);

      this.tweets = response.tweets;
      this.title = response.title;
      this.message = response.message;
      this.viewCtrl.dismiss({"tweets":this.tweets, "title":this.title, "message":this.message});
    });
  }

}
