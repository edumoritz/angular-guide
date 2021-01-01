import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})

export class ServerComponent implements OnInit {
  id: number = 10;
  serverStatus: string = 'offline';

  constructor() { }

  ngOnInit() { }

  getServerStatus() {
    return this.serverStatus;
  }
}
