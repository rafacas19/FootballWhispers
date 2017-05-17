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
  player:any;
  chartData:any;
  labels:any;
  values:any;
  logic1:string;
  logic2:string;
  search_type:string;


  constructor(public viewCtrl: ViewController, private tweetService: TweetService, private params:NavParams) {
    this.tweets = params.data.tweets;
    this.title = params.data.title;
    this.message = params.data.message;
    this.player = params.data.player;
    this.logic1 = "and";
    this.logic2 = "and";
    this.search_type = "query_all";
  }

  close() {
    this.viewCtrl.dismiss({"tweets":this.tweets, "title":this.title, "message":this.message, "player":this.player});
  }

  getTweets(value: {player: string, team: string, user: string}) {
    this.tweetService.getPosts(this.trimInput(value.player), this.trimInput(value.team), this.trimInput(value.user), this.search_type, this.logic1, this.logic2)
      .then(response => {
        // console.log(response["player_info"].birth_date);
          this.tweets = response["tweets"];
          this.title = response["title"];
          this.message = response["message"];
          this.player = response["player_info"];
          this.chartData = response["chartData1"];
          this.labels = response["labels"];
          this.values = response["values"];

          this.viewCtrl.dismiss({"tweets":this.tweets, "title":this.title, "message":this.message, "player":this.player, "chartData":this.chartData, "labels":this.labels, "values":this.values});
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
  
  trimInput(value) {
    return value.replace(/\s/g," OR ");
  }


}
