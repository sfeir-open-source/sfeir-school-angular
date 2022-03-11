import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  name = 'Sfeir Luxembourg';

  ngOnInit(): void {
    console.log('HomeComponent.ngOnInit');
  }
}
