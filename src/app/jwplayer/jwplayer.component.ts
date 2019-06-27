import { Component, OnInit } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
declare var jwplayer: any;
export interface Dropdowns {
  value: string;
  display: string;
}

@Component({
  selector: 'app-jwplayer',
  templateUrl: './jwplayer.component.html',
  styleUrls: ['./jwplayer.component.css']
})
export class JwplayerComponent implements OnInit {
  constructor(private baseService: BaseService) { }
  public categories = true;
  public category = 'FOOTBALL';
  
  public subcategory;
  private currentIndex=0;
  public channel = 1027;
  public userip:any;

  private Dropdowns:any = [];
  private allCategories:any = [];
  private subDropdowns:any = [];
  private serverList:any = [];

  ngOnInit() {
    this.getIpaddress()
    
  }
  private getIpaddress(){
    this.baseService.getIpaddress()
     .subscribe(response => {
       this.userip = response;
       this.getCategories()
     });
  }
  private getCategories(){
     this.baseService.fetchCategories()
     .subscribe(response => {
        this.allCategories = response;
        this.Dropdowns = this.seperateChannels(response);
        this.selectedGame()
        this.deployStreaming();
    });
  }
  private seperateChannels(res){
      var selectedCategory = []
      var response = res.Match;
      for(let i = 0; i < response.length;i++){
        if(selectedCategory.indexOf(response[i].Type) === -1){
           selectedCategory.push(response[i].Type);
        }
      }
      return selectedCategory;
  }
  private selectedGame(){
    this.subDropdowns = [];
    for(let i = 0;i< this.allCategories.Match.length;i++){
      if(this.category === this.allCategories.Match[i].Type){
        this.subDropdowns.push(this.allCategories.Match[i])
      }
    }
    this.subcategory  = this.subDropdowns[0].Channel;
    this.channel = Number(this.subcategory);
  }
  private selectedSubGame(channel){
    this.subcategory  = channel;
    this.channel = Number(this.subcategory);
  }
  private deployStreaming(){
    this.baseService.streamingData(this.channel, this.userip.ip)
    .subscribe(response => {
      this.serverList = this.modifyData(response);
       this.jwplayer()
    });
  }
  private jwplayer() {
    console.log(this.serverList[this.currentIndex])
    const playerJw = jwplayer('player').setup({
      title: 'Player Test',
      playlist: this.serverList[this.currentIndex],
      aspectratio: '4:1',
      mute: false,
      autostart: true,
      primary: 'html5',
    });

  jwplayer('player').on('setupError',((data) => {
              let currentUrl = this.getNextServerLink();
              console.log('setup error',currentUrl);      
              const playerJw = jwplayer('player').load(currentUrl);

          })
      );

  jwplayer('player').on('error',((data) => {
              let currentServer = this.getNextServerLink();
              console.log('connection error',currentServer);      
              jwplayer('player').load(currentServer);
              jwplayer('player').play();
          })
      );
  }
  private modifyData(response){
    var arrayData = ['240','360','480','720', '960'];
    var array = [];
    for(let i = 0;i < arrayData.length;i++){
      var data = {
        default : false,
        type: "hls",
        label: arrayData[i],
        file: response.StreamURL_HLS2
      }
      array.push(data);
    }
    return array;
  }
  private getNextServerLink(){
    if(this.currentIndex == this.serverList.cdnServers.length)
      this.currentIndex = 0;
    else
      this.currentIndex ++;
    
    return this.serverList.cdnServers[this.currentIndex];
  }

  private categoryChanged(category, event){
    this.categories = false;
    this.category = category
    this.selectedGame()
    this.deployStreaming();
  }
  private subcategoryChanged(subcategory, event){
    this.selectedSubGame(subcategory)
    this.deployStreaming();
  }
  private backhandleClick(event){
     this.categories = true;
  }
}