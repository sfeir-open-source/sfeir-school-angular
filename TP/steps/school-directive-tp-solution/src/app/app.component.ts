import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sfeir-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  today: Date;

  ngOnInit(): void {
    this.today = new Date();
  }
}
