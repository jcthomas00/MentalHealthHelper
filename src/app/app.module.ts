import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { FirestoreModule } from '@angular/fire/firestore';
// import { FireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCQPV4ciLkZ5UWfB46eJnctib5j6TerRk",
  authDomain: "testhost-67ad6.firebaseapp.com",
  projectId: "testhost-67ad6",
  storageBucket: "testhost-67ad6.appspot.com",
  messagingSenderId: "174435380016",
  appId: "1:174435380016:web:4343ca74fbccc422d9b6f5",
  measurementId: "G-4HF7DBZNC4"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
