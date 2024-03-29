import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }


  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count)
    // });
    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        if(count === 5) {
          observer.complete();
        }
        if(count > 3) {
          observer.error(new Error('Count is greater 3!'))
        }
        observer.next(count);
        count++;
      }, 1000);

    });



    this.firstObsSubscription = customIntervalObservable.pipe(
      filter(data => data > 0),
      map((data: number) => {
        return 'Round: ' + (data + 1);
      })
    ).subscribe((data) => {
      console.log(data);
    }, error => {
      console.log(error)
    }, () => {
      console.log('Completed!')
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
