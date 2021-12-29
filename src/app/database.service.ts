import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserMoodData } from './user-mood-data';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public firestore:AngularFirestore) { }

  public insertMoodData = (user:string, data:UserMoodData):Promise<any> => {
    return this.firestore.collection('UserMoods').doc(user).collection('moods').doc(Date.now() + '').set(data);                          
  }

  public getMoodData = (user:string):Observable<any> => {
    return this.firestore.collection('UserMoods').doc(user).collection('moods').valueChanges({ idField: 'date' })
  }
  
}
