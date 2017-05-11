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

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    var options = new RequestOptions({
      headers: myHeaders
    });

    var parameters = "player_input=" + player + "&" +
                 "team_input=" + team + "&" +
                 "user_input=" + user + "&" +
                 "querySelector=" + querySelector;

   return new Promise (resolve =>{
     this.http.post(this.baseUrl, parameters, options)
       .map(res => res.json())
       .subscribe(data => {
         this.data = data;
         resolve(this.data);
       });
     });
  }
}
