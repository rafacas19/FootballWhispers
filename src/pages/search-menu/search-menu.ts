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
  playerInfo:any;
  optional1:string;
  optional2:string;

  constructor(public viewCtrl: ViewController, private tweetService: TweetService, private params:NavParams) {
    this.tweets = params.data.twets;
    this.title = params.data.title;
    this.message = params.data.message;
  }

  close() {
    this.viewCtrl.dismiss({"tweets":this.tweets, "title":this.title, "message":this.message});
  }

  getTweets(value: {player: string, team: string, user: string}) {
    console.log(this.optional1);
    console.log(this.optional2);
    this.tweetService.getPosts(value.player, value.team, value.user, "query_all", this.optional1, this.optional2)
      .then(response => {
        console.log(response["tweets"]);
          this.tweets = response["tweets"];
          this.title = response["title"];
          this.message = response["message"];
          this.viewCtrl.dismiss({"tweets":this.tweets, "title":this.title, "message":this.message});
      });

  }

  initialRequest() {
    // console.log(value.player)
    // // console.log(this.tweetService.getPosts(value.player, value.team, value.user))
    this.tweetService.getMain().then(response => {
      this.tweets = response.tweets;
      this.playerInfo = response.playerInfo;
      this.title = response.title;
      this.message = response.message;
      this.viewCtrl.dismiss({"tweets":this.tweets, "title":this.title, "message":this.message});
    });
  }

  changeSelect(logic1) {
    this.optional1 = logic1;
  }

  changeSelect2(logic2) {
    this.optional2 = logic2;
  }


}
