import {Component, Input, OnInit, Renderer2} from '@angular/core';
import {Event} from "../event";
import {EventService} from "../event.service";
import {DateTime} from 'luxon';
import {CalendarType} from "../calendarType";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() eventsUrl: string = "";
  @Input() calendarsUrl: string = "";
  @Input() eventsArray: Event[] = [];
  @Input() calendarsArray: CalendarType[] = [];
  @Input() views: string = "both";
  @Input() research: boolean = true;
  @Input() researchUrl: string = "";
  @Input() onEventClick: (event: Event) => void;

  events: Event[] = [];
  eventsMap = new Map<number, Event[]>();
  calendars = new Map<string, string>();
  public month = true;

  constructor(private renderer: Renderer2, private eventService: EventService) { }

  ngOnInit(): void {
    //Check urls
    if(this.eventsUrl != "")
      this.getEvent();
    if(this.calendarsUrl != "")
      this.getCalendars();
    //check Arrays
    if(this.eventsArray != []) {
      this.eventsArray.sort((a,b) => ( parseInt(a.timeStart.replace(':','')) < parseInt(b.timeStart.replace(':','')) ? -1 : 1));
      for(let eventArr of this.eventsArray)
        this.events.push(eventArr);
      this.eventsToMap();
    }
    if(this.calendarsArray != []) {
      let calendars = Array<CalendarType>();
      for(let calendarArr of this.calendarsArray)
        calendars.push(calendarArr);
      //Create map for calendar type
      for (let i = 0; i < calendars.length; i++)
        this.calendars.set(calendars[i].name, calendars[i].color);
    }
    //views
    if(this.views == "month")
      this.month = true;
    else if(this.views == "week")
      this.month = false;
  }

  getEvent(): void {
    this.eventService.getEvent(this.eventsUrl).subscribe((res)=>{
      res.sort((a,b) => ( parseInt(a.timeStart.replace(':','')) < parseInt(b.timeStart.replace(':','')) ? -1 : 1));
      this.events = res;
      this.eventsToMap();
    });
  }

  getCalendars(): void {
    let calendars = Array<CalendarType>();
    this.eventService.getCalendars(this.calendarsUrl).subscribe((res)=>{
      calendars = res;
      //Create map for calendar type
      for (let i = 0; i < calendars.length; i++)
        this.calendars.set(calendars[i].name, calendars[i].color);
    });
  }

  eventsToMap(){
    //Create map for events
    for (let i = 0; i < this.events.length; i++){
      let date = DateTime.fromFormat(this.events[i].date, "dd.MM.yyyy");
      if(this.eventsMap.get(date.toMillis()) !== undefined){
        // @ts-ignore
        this.eventsMap.get(date.toMillis()).push(this.events[i]);
      }else{
        this.eventsMap.set(date.toMillis(), []);
        // @ts-ignore
        this.eventsMap.get(date.toMillis()).push(this.events[i]);
      }
    }
  }

  changeCalendar(month: boolean){
    this.month = month;
  }
}
