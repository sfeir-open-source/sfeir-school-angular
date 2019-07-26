import { Component, OnInit } from '@angular/core';
import { MyPipePipe } from './my-pipe.pipe';

@Component({
  selector: 'sfeir-root',
  template: `
    <div>Hello World!</div>
    <div>{{ 4 | myPipe }} + {{ num }} + {{ num2 }}</div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'pipe-demo';
  num: number;
  num2: number;

  constructor(private pipe: MyPipePipe) {}

  ngOnInit() {
    this.num = this.pipe.transform(10);
    this.pipe.leeeeeek = 30000;
    this.num2 = this.pipe.transform(10, 20);
  }
}
