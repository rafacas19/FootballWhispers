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
  optional1:string;
  optional2:string;
  player:any;


  constructor(public viewCtrl: ViewController, private tweetService: TweetService, private params:NavParams) {
    this.tweets = params.data.tweets;
    this.title = params.data.title;
    this.message = params.data.message;
    this.player = params.data.player;
  }

  close() {
    this.viewCtrl.dismiss({"tweets":this.tweets, "title":this.title, "message":this.message, "player":this.player});
  }


  getTweets(value: {player: string, team: string, user: string}) {
    console.log(this.optional1);
    console.log(this.optional2);
    this.tweetService.getPosts(value.player, value.team, value.user, "query_all", this.optional1, this.optional2)
      .then(response => {
        console.log(response["player_info"].birth_date);
          this.tweets = response["tweets"];
          this.title = response["title"];
          this.message = response["message"];
          this.player = response["player_info"]
          this.viewCtrl.dismiss({"tweets":this.tweets, "title":this.title, "message":this.message, "player":this.player});
      }).catch(error => {
        console.log("Promise Rejected")
      });

  }

  initialRequest() {
    // console.log(value.player)
    // // console.log(this.tweetService.getPosts(value.player, value.team, value.user))
    this.tweetService.getMain().then(response => {
      this.tweets = response.tweets;
      this.player = response.player;
      this.title = response.title;
      this.message = response.message;
      this.player = response.player;
      this.viewCtrl.dismiss({"tweets":this.tweets, "title":this.title, "message":this.message, "player":this.player});
    });
  }

  changeSelect(logic1) {
    this.optional1 = logic1;
  }

  changeSelect2(logic2) {
    this.optional2 = logic2;
  }


}
