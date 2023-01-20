# AngularCalendar

This repository contains an angular project of a calendar web developed with AngularJS.
The projects has the following characteristics:
* View an events list from different calendars.
* Possibility to choose which calendar to see the events.
* Choose to see the calendar monthly or weekly.
* Search events via Title or Description (the results are shown in a side list).
* Navigate between weeks/months, with a "today" button to move at the current week/month.
* Today is highlighted.
* It works with local data (events or calendars arrays in js) or with remote data (for the moment there are no data because they are taken from a URL that is no longer filled, sappendix). The search, for the remote data, is also performed with a URL.
* The Developer can call a personal function when clicking on a event simply passing it as a parameter.

The project has a component (calendar) can be called and configured as explained:
** The component handles only 1 day events or shorter and can't handle overlapping events**
* Local events and calendars:
  * Events Array
  * Calendars Array
* Remote events and calendar:
  * events source URL
  * calendar source URL
* Configure view mode (week and month, only week, only month)
* Toggle research activate/deactivate
* Decide which function to call when clicking on an event

Follows an example of the component with the different parameter:
```html
<app-calendar [eventsArray]="events" [calendarsArray]="calendars"
              [eventsUrl]="'https://supsi-events.herokuapp.com/bff/events'" [calendarsUrl]="'https://supsi-events.herokuapp.com/bff/calendars'"
              [research]="false" [views]="'week'" [onEventClick]="eventFunction"></app-calendar>
```
* **[eventsArray]** &#8594 the name of the events array you want to use
* * **[calendarsArray]** &#8594 the name of the calendars array you want to use
* * **[eventsUrl]** &#8594 the URL to get events. The value has to be written as a string
* * **[calendarsUrl]** &#8594 the URL to get calendars. The value has to be written as a string
* * **[research]** &#8594 choose if activate the research (true/false)
* * **[views]** &#8594 the views you want to have ('week'/'month'/'both') not using this parameter set automatically 'both'. The value has to be written as a string
* * **[onEventClick]** &#8594 the function created that wants to be used when  clicking on an event

\appendix
APPENDIX: REMOTE ENDPOINTS
* endpoint events list
  * https://supsi-events.herokuapp.com/bff/events
* endpoint search Events (searchText)
  * https://supsi-events.herokuapp.com/bff/events?search=searchText
* endpoint calendars list
  * https://supsi-events.herokuapp.com/bff/calendar
