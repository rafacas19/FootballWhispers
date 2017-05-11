import { Component, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
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
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get(this.baseUrl)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  getPosts(player: string, team: string, user: string, querySelector: string) {
    console.log("Making POST request")
    // console.log(player + ", " + team)
    // console.log(this.http.get(this.baseUrl).map(res => res.json()));
    // var req = {
    //   method: 'POST',
    //   url: this.baseUrl,
    //   headers:{
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   body: {
        // "player_input":player,
        // "team_input": team,
        // "user_input": user,
        // "querySelector": querySelector
    //   }
    // }
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // let options = new RequestOptions({headers:headers});
    var url = "http://localhost:3000?player_input=" + player + "&team_input=" + team
              + "&user_input=" + "" + "&querySelector=" + querySelector;
    //
    // let postParams = {
    //   "player_input":player,
    //   "team_input": team,
    //   "user_input": user,
    //   "querySelector": querySelector
    // }

    // return new Promise(resolve => {
    //   this.http({
    //     method: 'POST',
    //     headers: {'Content-Type':'application/x-www-form-urlencoded'},
    //     data: {
    //       "player_input":player,
    //       "team_input": team,
    //       "user_input": user,
    //       "querySelector": querySelector
    //     }
    //   })
    // });

    // return new Promise(resolve =>{
    //   this.http.post(this.baseUrl, {body: {
    //     "player_input":player,
    //     "team_input": team,
    //     "user_input": user,
    //     "querySelector": querySelector
    //   }},
    //   {'Content-Type':'application/x-www-form-urlencoded'})
    //     .map(res => res.json())
    //     .subscribe(data => {
    //       console.log(data);
    //     });
    // });


    return this.http.post(url,headers)
    .map(res => res.json())
    .subscribe(data => {
      console.log(data);
    });
    // + ", " + value.user
  }
}
