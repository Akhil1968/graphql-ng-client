import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Course, Query } from './types';

const GET_DATA = gql`
query getAllCourses {
  courses {
    id
    title
    author
    description
    topic
  }
}
`;

@Component({
  selector: 'course-list',
  template: `
  <div *ngFor="let course of courses | async">
    <div class="card" style="width: 100%; margin-top: 10px">
      <div class="card-body">
        <h5 class="card-title">{{course.title}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{course.author}}</h6>
        <p class="card-text">{{course.description}}</p>
      </div>
    </div>
  </div>
  `,
})
export class ListComponent implements OnInit {
  courses: Observable<Course[]>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.courses = this.apollo
      .watchQuery<Query>({
        query: GET_DATA,
      })
      .valueChanges.pipe(map(result => result.data.courses ));
  }
}