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
  tweets:any;
  title:any;
  message:any;
  constructor(public navCtrl: NavController, public popoverController: PopoverController, private tweetService:TweetService) {
    this.title = "No title yet";
    this.message = "No message yet";
  }



  ngOnInit() {
    this.initialReq();
  }

  initialReq() {
    this.tweetService.getMain().then(response => {
      // console.log(response.title);
      // console.log(response.body);
      this.tweets = response.tweets;
      this.title = response.title;
      this.message = response.message;
    });
  }

  openSearchBar(myEvent) {
    let popover = this.popoverController.create(SearchMenu, {"tweets":this.tweets, "title":this.title, "message":this.message})


    popover.present({
      ev: myEvent
    })
    popover.onDidDismiss((data) => {
      // console.log(data);
      this.tweets = data.tweets;
      this.title = data.title;
      this.message = data.message;
    });
  }

}
