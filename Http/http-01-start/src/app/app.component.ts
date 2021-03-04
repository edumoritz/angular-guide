import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const urlFirebase = 'https://ng-complete-guide-3f8c9-default-rtdb.firebaseio.com';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];


  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post(urlFirebase+'/posts.json', postData).subscribe(responseData => {
      console.log(responseData)
    });
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
}
