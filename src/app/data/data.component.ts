import { Component, OnInit } from '@angular/core';
import { WhoDataService } from '../who-data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  countries:Object[] = []; //hold country names from WHO - used for map
  facilities:any[] = []; //hold facilities by country names from WHO
  suicides:Object[] = []; //hold suicides by country names from WHO

  public graph = {
    data: [
      {
        type: 'choropleth', 
        locationmode: "country names", 
        locations:this.countries,
        z: this.suicides,
        text: this.facilities,
        hovertemplate:"   <b>%{location}</b>   <br><br>" +
        "   Suicides: %{z:.2f}<i><br>   per 100,000 people</i>   <br><br>" +
        "   %{text}<i><br>   per 100,000 people</i>   <br><extra></extra>",
        //showscale: false,
        //colorscale: 'Reds',

        colorscale: [
          [0, 'rgb(242,240,247)'], [0.05, 'rgb(218,218,235)'],
          [0.1, 'rgb(188,189,220)'], [0.2, 'rgb(158,154,200)'],
          [0.3, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
      ],
        colorbar: {bordercolor: "#fff",x:.85,len:.6,ticks:"outside"},
        marker: {
          line:{
              color: 'rgb(84,39,143)',
              width: 1
          }
        }
      }
    ],
    layout: {
      margin: {"r":0,"t":30,"l":0,"b":0}, 
      title: 'Suicides & Mental Health Facilities by Country', 
      autosize:true,
      hoverlabel: {
        bgcolor: "white",
        font_size: 16,
        color: 'pink'
      },
      geo: {
          projection: {
              type: 'orthographic'
              //distance: 40
          },
          locations:"iso_alpha",
          showocean:true, 
          oceancolor:"LightBlue",
          showlakes: true,
          lakecolor:'LightBlue',
          showland:true,
          landcolor: '#eee',
          showcountries:true, 
          countrycolor:"#fff",
          // showframe: false,
        showcoastlines:false
      }
    },
    config: {
      responsive: true,
      displayModeBar: false,
      displaylogo: false,
      showLink: false
    },
    style: {
    }
  };
  constructor(private dataStore: WhoDataService) { }

  unpackArray(array:any[], key:string) {
    return array.map(array => array[key]);
  }

  ngOnInit(): void {

    this.dataStore.getWHOData("facilities")
        .subscribe(data => {
          this.facilities = data.value ? data.value:[];
    });
    this.dataStore.getWHOData("countries")
      .subscribe(data => {
        data.value.forEach((element:any) => this.countries[element.CountryCode]=element.CountryName);
    });
    this.dataStore.getWHOData("suicides")
      .subscribe(data => {
        this.suicides = data.value ? this.unpackArray(data.value, "NumericValue"):[]; 

        //get facilities data to match suicide rates
        const facilities = data.value.map((element:any) => {
          let result = this.facilities.find( ({ SpatialDim }) => SpatialDim === element.SpatialDim);
          result =  result === undefined ? -1 : result.NumericValue;
          return result;
        }); 
        
        //get country names to match suicide rates
        const countries = data.value.map((element:any) => {
          return this.countries[element.SpatialDim]
        });
        
        //update data
        this.graph.data[0].locations = countries;
        this.graph.data[0].z = this.suicides
        this.graph.data[0].text = facilities.map((facility:number) => 
          facility===-1 ? 'Facilities: Not Available':'Facilities: '+facility
        );
      });
  }

  

}
