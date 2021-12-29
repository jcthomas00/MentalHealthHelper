import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = "https://api.skybiometry.com",
      API_KEY = "hmb9r12j6u3rrt9n8k13omftrc",
      API_SECRET = "von227mf7c9q94ppubo6tc9idf",
      MOOD_PATH = `/fc/faces/detect.json?api_key=${API_KEY}&api_secret=${API_SECRET}&attributes=mood`;
      
@Injectable({
  providedIn: 'root'
})

export class AnalyzeMoodService {

  constructor(public httpClient:HttpClient) { }

  analyzePhoto = (formData:FormData):Observable<any> => {
    return this.httpClient.post<any>(BASE_URL+MOOD_PATH, formData);
  }
}
