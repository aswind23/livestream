import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { BaseService } from './base.service';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { JwplayerComponent } from './jwplayer/jwplayer.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  imports:      [ BrowserModule, HttpClientModule, FormsModule, AngularFontAwesomeModule ],
  declarations: [ AppComponent, HelloComponent, JwplayerComponent ],
  bootstrap:    [ AppComponent ],
  providers: [BaseService ]
})
export class AppModule { }
