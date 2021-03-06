import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators'

const urlFirebase = 'https://ng-complete-guide-3f8c9-default-rtdb.firebaseio.com';

@Injectable({providedIn: 'root'})
export class PostsService {


  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content }
    this.http.post<{ name: string }>(urlFirebase+'/posts.json', postData)
    .subscribe(responseData => {
      console.log(responseData)
    });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>(urlFirebase+'/posts.json')
    .pipe(map(responseData => {
      const postsArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key })
        }
      }
      return postsArray;
    }));
  }

  deletePosts() {
    return this.http.delete(urlFirebase+'/posts.json');
  }
}
