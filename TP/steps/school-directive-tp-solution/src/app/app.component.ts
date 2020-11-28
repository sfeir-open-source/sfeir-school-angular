import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sfeir-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  today: Date;
  files: Array<File>;

  ngOnInit(): void {
    this.today = new Date();
  }

  dropFiles(files: Array<File>) {
    this.files = [...(this.files || []), ...files];
  }
}
