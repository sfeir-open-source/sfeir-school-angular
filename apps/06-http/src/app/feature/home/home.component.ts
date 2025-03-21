import { Component, OnInit } from '@angular/core';
import { PEOPLE } from '../../mocks/people.mock';
import { People } from '../../shared/models/people.model';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  person: People;

  ngOnInit(): void {
    const [firstPerson] = PEOPLE;
    this.person = firstPerson;
  }

  getRandomPerson(): void {
    this.person = PEOPLE[Math.floor(Math.random() * PEOPLE.length)];
  }
}
