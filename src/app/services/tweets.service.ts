import { Component, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
@Component({
  providers: [Http]
})
export class TweetService{
  data:any;
  http:any;
  baseUrl: string;

  constructor(http:Http) {
    this.http = http;
    this.baseUrl = "http://localhost:3000"
  }

  getMain() {
    console.log('Making GET request');
    // var req = {
    //   method: 'GET',
    //   url: "http://localhost:3000"
    // };
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('http://localhost:3000')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

    // return this.http.get('http://localhost:3000');
  }

  getPosts(player: string, team: string, user: string) {
    // console.log(player + ", " + team)
    // console.log(this.http.get(this.baseUrl).map(res => res.json()));
    var req = {
      method: 'POST',
      url: this.baseUrl,
      data: {
        "player_input":player,
        "team_input": team,
        "user_input": user
      }
    }
    return this.http.get(req);
    // + ", " + value.user
  }
}
