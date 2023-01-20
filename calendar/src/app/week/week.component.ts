import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DateTime} from 'luxon';
import {EventService} from "../event.service";
import {Event} from "../event";
import {Observable, of} from "rxjs";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {
  @Input() eventsMap = new Map<number, Event[]>();
  @Input() calendars = new Map<string, string>();
  @Input() research: boolean = true;
  @Input() researchUrl: string = "";
  @Input() onEventClick: (event: Event) => void;

  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('searchInput') searchInput: any;
  public today = DateTime.now().startOf("day");
  public date = this.today;
  public firstDay = this.date.startOf("week");
  public lastDay = this.date.endOf("week");
  public daysArr : any;

  searchEvent$: Observable<Event[]>;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.updateCalendar();
  }

  todayCheck(today: any){
        if(!today){
          return false;
        }
        return DateTime.now().day == today.day && DateTime.now().month == today.month && DateTime.now().year == today.year;
      }

  createCalendar(week : any) {
    let firstDay = week.startOf("week");
    //Create days array with days of the week
    return Array.from(Array(7).keys())
      .map(Number.call, Number)
      //add a DateTime object for each day
      .map((n) => {
        return firstDay.plus({days: n});
      });
  }

  moveToToday(){
    this.date = this.today;
    this.updateCalendar();
  }

  nextWeek(){
    this.date = this.date.plus({weeks: 1});
    this.updateCalendar();
  }

  previousWeek(){
    this.date = this.date.plus({weeks: -1});
    this.updateCalendar();
  }

  updateCalendar(){
    this.firstDay = this.date.startOf("week");
    this.lastDay = this.date.endOf("week");
    this.daysArr = this.createCalendar(this.date);
  }

  search(){
    let search = this.searchInput.nativeElement.value;
    if(search == ""){
      this.sidenav.close();
      this.searchEvent$ = of([]);
      return;
    }
    //search by url if present
    let results: Event[] = [];
    if(this.researchUrl != "") {
      this.eventService.searchEvents(this.researchUrl, search).subscribe((res)=>{
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

  show(){
    //Only implemented in month component
  }
}
