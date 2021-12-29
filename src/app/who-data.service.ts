import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WhoDataService {

  url = "https://corsrerout.herokuapp.com/cors"; //express server to get around CORS issues

  constructor(private http:HttpClient) { }

  getWHOData = (subject:string):Observable<any> => {
    let link = ''
    switch(subject){
      case 'countries':
        link = 'https://ghoapi.azureedge.net/api/RegionCountry';
        break;
      case 'facilities':
        link = 'https://ghoapi.azureedge.net/api/MH_10';
        break;
      case 'suicides':
        link = "https://ghoapi.azureedge.net/api/MH_12?$filter=Dim1 eq 'BTSX' and TimeDim eq 2015";
        break;
      default:
        break;
    }
    return this.http.post(this.url,{link: link});
  }
 
}
