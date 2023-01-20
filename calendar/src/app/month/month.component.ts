import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DateTime} from 'luxon';
import {EventService} from "../event.service";
import {Event} from "../event";
import { MatSidenav } from '@angular/material/sidenav';
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {
  @Input() eventsMap = new Map<number, Event[]>();
  @Input() calendars = new Map<string, string>();
  @Input() research: boolean = true;
  @Input() researchUrl: string = "";
  @Input() onEventClick: (event: Event) => void;

  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('searchInput') searchInput: any;
  public today = DateTime.now().startOf("day");
  public date = this.today;
  public daysArr : any;
  calendarsCheck = new Map<string, boolean>();

  searchEvent$: Observable<Event[]>;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.updateCalendar();
    this.setCalendarsCheck();
  }

  todayCheck(today: any){
    if(!today){
      return false;
    }
    return DateTime.now().day == today.day && DateTime.now().month == today.month && DateTime.now().year == today.year;
  }

  createCalendar(month : any) {
    let firstDay = month.startOf("month");
    let lastDay = month.endOf("month");
    //Create days array with days before and after the month
    let days = new Array(firstDay.weekday-1);
    days.push(...Array.from(Array(month.daysInMonth).keys())
      .map(Number.call, Number)
      //add a DateTime object for each day
      .map((n) =>{
        return firstDay.plus({days: n});
      }));
    days.push(...new Array(7-lastDay.weekday));
    return days;
  }

  setCalendarsCheck(): void{
    for(let [key, value] of this.calendars){
      this.calendarsCheck.set(key, true);
    }
  }

  moveToToday(){
    this.date = this.today;
    this.updateCalendar();
  }

  nextMonth(){
    this.date = this.date.plus({months: 1});
    this.updateCalendar();
  }

  previousMonth(){
    this.date = this.date.plus({months: -1});
    this.updateCalendar();
  }

  updateCalendar(){
    this.daysArr = this.createCalendar(this.date);
  }

  search(){
    let search = this.searchInput.nativeElement.value;
    if(search == ""){
      this.sidenav.close();
      this.searchEvent$ = of([]);
      return;
    }
    let results: Event[] = [];
    //search by url if present
    if(this.researchUrl != "") {
      this.eventService.searchEvents(this.researchUrl, search).subscribe((res) => {
        results = res;
      });
    }else {
      //Filter map if there is no url
      [...this.eventsMap.values()].forEach(e => {
        for (let ev of e.filter(el => el.title.includes(search) || el.description.includes(search)))
          results.push(ev);
      });
    }
    results.sort((a, b) => (parseInt(a.timeStart.replace(':', '')) < parseInt(b.timeStart.replace(':', '')) ? -1 : 1));
    this.sidenav.open();
    this.searchEvent$ = of(results);
  }

  show(value: string){
    // @ts-ignore
    this.calendarsCheck.set(value, !this.calendarsCheck.get(value));
  }
}
