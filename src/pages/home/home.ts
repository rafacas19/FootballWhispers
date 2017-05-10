import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { SearchMenu } from '../search-menu/search-menu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public popoverController: PopoverController) {

  }

  getPost(query) {
    return
  }

  openSearchBar(myEvent) {
    let popover = this.popoverController.create(SearchMenu)

    popover.present({
      ev: myEvent
    })

  }

}
