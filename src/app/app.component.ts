import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  loadedFeature='recipe';

  ngOnInit(){

      let config = {
        apiKey: "AIzaSyChXE6D2NIcqkutXlK4Llma1RlZZy2WwFc",
        authDomain: "recipe-book-4dbe3.firebaseapp.com",
        databaseURL: "https://recipe-book-4dbe3.firebaseio.com",
        projectId: "recipe-book-4dbe3",
        storageBucket: "recipe-book-4dbe3.appspot.com",
        messagingSenderId: "109388171602"
      };
      firebase.initializeApp(config);
    
  }
  
  onNavigate(feature:string){
    this.loadedFeature=feature;
  }

}
