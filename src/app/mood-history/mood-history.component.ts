import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'mood-history',
  templateUrl: './mood-history.component.html',
  styleUrls: ['./mood-history.component.scss']
})
export class MoodHistoryComponent implements OnInit {
  @Input() user:string = '';
  moods:any = {dates:[],anger:[],disgust:[],fear:[],happiness:[],sadness:[]};
  public EMOTIONS:string[] = ['anger', 'disgust', 'fear', 'happiness', 'sadness'];
  dates:any = []

  graph = {
    data: [
      { x: this.moods.dates, y: this.moods[this.EMOTIONS[0]], name:this.EMOTIONS[0], type: 'scatter', mode: 'lines+points', marker: {color: '#AAE9E5'},line: {shape: 'spline'} },
      { x: this.moods.dates, y: this.moods[this.EMOTIONS[1]], name:this.EMOTIONS[1], type: 'scatter', mode: 'lines+points', marker: {color: '#87C7F1'},line: {shape: 'spline'} },
      { x: this.moods.dates, y: this.moods[this.EMOTIONS[2]], name:this.EMOTIONS[2], type: 'scatter', mode: 'lines+points', marker: {color: '#FEB7D3'},line: {shape: 'spline'} },
      { x: this.moods.dates, y: this.moods[this.EMOTIONS[3]], name:this.EMOTIONS[3], type: 'scatter', mode: 'lines+points', marker: {color: '#FFEDA9'},line: {shape: 'spline'} },
      { x: this.moods.dates, y: this.moods[this.EMOTIONS[4]], name:this.EMOTIONS[4], type: 'scatter', mode: 'lines+points', marker: {color: '#EACFFF'},line: {shape: 'spline'} },
  ],
  layout: {title: 'Your Emotions over time', hovermode: "x unified"},
  style: {key:''},
  config: {}
  }

  constructor(public databaseService:DatabaseService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData = () => {
      this.databaseService.getMoodData(this.user).subscribe((data) => {
        data.forEach((element:any,i:number) => {
          this.moods.dates[i] = new Date(parseInt(element.date)).toLocaleDateString();
          this.EMOTIONS.forEach((emotion, j) => {
            this.moods[emotion][i] = element.attributes[j]
          })
        });
      console.log(this.moods)
    });
  }

}
