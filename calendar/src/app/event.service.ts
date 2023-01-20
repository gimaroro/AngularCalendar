import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Event} from "./event";
import {HttpClient} from "@angular/common/http";
import {CalendarType} from "./calendarType";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  searchEventsUrl = 'https://supsi-events.herokuapp.com/bff/events?search=';

  constructor(private http: HttpClient) { }

  /** GET events from the url */
  getEvent(eventsUrl: string): Observable<Event[]> {
    return this.http.get<Event[]>(eventsUrl);
  }

  /** GET events from URL search */
  searchEvents(searchEventsUrl: string, search: string): Observable<Event[]> {
    return this.http.get<Event[]>(searchEventsUrl+search);
  }

  /** GET calendar types from the url */
  getCalendars(calendarTypesUrl: string): Observable<CalendarType[]> {
    return this.http.get<CalendarType[]>(calendarTypesUrl);
  }
}
