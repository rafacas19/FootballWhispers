import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchMenu } from './search-menu';

@NgModule({
  declarations: [
    SearchMenu,
  ],
  imports: [
    IonicPageModule.forChild(SearchMenu),
  ],
  exports: [
    SearchMenu
  ]
})
export class SearchMenuModule {}
