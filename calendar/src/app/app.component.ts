import { Component, OnInit } from '@angular/core';
import {CalendarComponent} from "./calendar/calendar.component";
import {MonthComponent} from "./month/month.component";
import {Event} from "./event";

@Component({
  providers: [CalendarComponent, MonthComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Web2 Calendar";
  events = [
    {
      "id": "123",
      "title": "Gym",
      "description": "Training session",
      "date": "06.05.2022",
      "timeStart": "16:30",
      "timeEnd": "17:30",
      "calendar": "private"
    },
    {
      "id": "127",
      "title": "Lessons",
      "description": "School lessons",
      "date": "06.05.2022",
      "timeStart": "08:30",
      "timeEnd": "16:00",
      "calendar": "school"
    },
    {
      "id": "124",
      "title": "Meeting",
      "description": "Graduation project meeting",
      "date": "02.06.2022",
      "timeStart": "09:30",
      "timeEnd": "11:30",
      "calendar": "school"
    }
  ]
  calendars = [
    {
      "name": "private",
      "color": "#129d33"
    },
    {
      "name": "school",
      "color": "#cc4dda"
    }
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

  eventFunction(event: Event): void{
    alert(event.title +"\n"+ event.description +"\n"+ event.date +"\n"+ event.timeStart +" - "+ event.timeEnd);
  }
}
