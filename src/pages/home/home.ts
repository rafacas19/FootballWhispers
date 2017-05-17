import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { SearchMenu } from '../search-menu/search-menu';
import { TweetService } from '../../app/services/tweets.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('lineCanvas') lineCanvas;

  tweetsAvailable:boolean;
  playerAvailable:boolean;
  tweets:any;
  title:any;
  message:any;
  player:any;
  lineChart:any;
  chartData:any;
  labels:any;
  values:any;

  constructor(public navCtrl: NavController, public popoverController: PopoverController, private tweetService:TweetService) {
    this.tweets = []
    this.title = "No title yet";
    this.message = "No message yet";
    this.player = "No player selected";
    this.tweetsAvailable = false;
    this.playerAvailable = false;
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
      this.chartData = response.chartData;
      this.labels = response.labels;
    });
  }

  openSearchBar(myEvent) {
    let popover = this.popoverController.create(SearchMenu, {"tweets":this.tweets, "title":this.title, "message":this.message, "player":this.player, "chartData":this.chartData, "labels":this.labels, "values":this.values})
    popover.present({
      ev: myEvent
    })
    popover.onDidDismiss((data) => {
      this.tweets = data.tweets;
      this.title = data.title;
      this.message = data.message;
      this.player = data.player;
      this.chartData = data.chartData;
      this.labels = data.labels;
      this.values = this.values;
      if(this.tweets.length > 0 ){
        this.tweetsAvailable = true
      } else {
        this.tweetsAvailable = false
      }
      if(this.player.name) {
        this.playerAvailable = true
      } else {
        this.playerAvailable = false
      }

      /*this.lineChart = new Chart(this.lineCanvas.nativeElement, {

        type: 'line',
        data: {
          labels: this.labels,
          datasets: [{
            label: 'No. of tweets',
            data: this.chartData,
            backgroundColor: "rgba(153,255,51,0.4)"
          }]
        },
        options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
        }
      }); */
    });
  }

}
