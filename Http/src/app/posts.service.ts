import { Post } from './post.model';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map, catchError, tap } from 'rxjs/operators'
import { Subject, throwError } from 'rxjs';

const urlFirebase = 'https://ng-complete-guide-3f8c9-default-rtdb.firebaseio.com';

@Injectable({providedIn: 'root'})
export class PostsService {
  error = new Subject<string>();;

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content }
    this.http.post<{ name: string }>(
      urlFirebase+'/posts.json',
      postData,
      {
        observe: 'response'
      }
    )
    .subscribe(responseData => {
      console.log(responseData)
    }, error => {
      this.error.next(error.message)
    });
  }

  fetchPosts() {
    let searcParams = new HttpParams();
    searcParams = searcParams.append('print', 'pretty');
    searcParams = searcParams.append('custom', 'key');

    return this.http.get<{ [key: string]: Post }>(
      urlFirebase+'/posts.json',
      {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        params: searcParams,
        responseType: 'json'
      }
    )
    .pipe(map(responseData => {
      const postsArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key })
        }
      }
      return postsArray;
    }),
    catchError(errorRes => {
      return throwError(errorRes);
    })
    );
  }

  deletePosts() {
    return this.http.delete(
      urlFirebase+'/posts.json',
      {
        observe: 'events'
      }
    ).pipe(tap(event => {
      console.log(event);
      if (event.type === HttpEventType.Sent) {
        // ...
      }
      if (event.type === HttpEventType.Response) {
        console.log(event.body)
      }
    }));
  }
}
