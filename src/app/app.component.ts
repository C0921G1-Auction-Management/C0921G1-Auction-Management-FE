import { Component } from '@angular/core';
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAC2sCt7mfLGjUPt0iDgqyEqlbPQLLiYIw',
  databaseURL: 'https://angularchat-91c3d-default-rtdb.firebaseio.com'
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auction-fe';

  constructor() {
    firebase.initializeApp(config);
  }
}
