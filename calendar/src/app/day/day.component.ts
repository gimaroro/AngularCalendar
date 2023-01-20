import { Component, OnInit, Input } from '@angular/core';
import {DateTime} from 'luxon';
import {Event} from "../event";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() day: DateTime | undefined;
  @Input() events = new Map<number, Event[]>();
  @Input() calendars = new Map<string, string>();
  @Input() calendarsCheck = new Map<string, boolean>();
  @Input() onEventClick: (event: Event) => void;

  todayEvents: Event[] = []

  constructor() { }

  ngOnInit(): void {
    console.log(this.calendarsCheck.size);
  }

  eventExists(day: any){
    this.todayEvents = [];
    if(day != undefined && this.events.size > 0) {
      //Get events of day from map
      // @ts-ignore
      this.todayEvents = this.events.get(day.toMillis());
    }
    //Check if there are events
    if(this.todayEvents == undefined || this.todayEvents.length == 0) {
      return null;
    }
    return this.todayEvents;
  }

  eventClick(event: Event) {
    this.onEventClick(event);
  }
}
