import { Component, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
@Component({
  providers: [Http]
})
export class TweetService{
  http:any;
  baseUrl: string;

  constructor(http:Http) {
    this.http = http;
    this.baseUrl = "http://localhost:3000/"
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
