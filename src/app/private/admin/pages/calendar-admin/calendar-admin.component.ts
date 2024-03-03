import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Reservation } from 'src/app/models/Reservation';
import { EventDetail } from 'src/app/private/user/pages/calendar/calendar.component';
import { ReservationService } from 'src/app/private/user/services/reservation.service';

@Component({
  selector: 'app-calendar-admin',
  templateUrl: './calendar-admin.component.html',
  styleUrls: ['./calendar-admin.component.scss']
})
export class CalendarAdminComponent implements OnInit, AfterViewInit {
  @ViewChild('daysContainer') daysContainer!: ElementRef;

  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();

  months: String[] = [
    'ENERO',
    'FEBRERO',
    'MARZO',
    'ABRIL',
    'MAYO',
    'JUNIO',
    'JULIO',
    'AGOSTO',
    'SETIEMBRE',
    'OCTUBRE',
    'NOVIEMBRE',
    'DICIEMBRE',
  ];

  eventsArr: EventDetail[] = [];

  topDate: string = '';
  prevDays: number[] = [];
  isToday: boolean = false;
  day_today: number = 0;
  days: number[] = [];
  nextDays: number[] = [];
  dateInput: string = '';
  invalidDate: boolean = false;
  isEvent: boolean = false;
  day_event: number = 0;
  activeDay: number = new Date().getDate();
  event_days: number[] = [];
  event_day: string = '';
  event_date: string = '';
  eventDetails: EventDetail[] = [];
  showDetails: boolean = false;

  showSpinner: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.showSpinner = true;
    this.eventsArr = [];
    forkJoin([this.reservationService.getAll()]).subscribe(([reservations]) => {
      reservations.forEach((reservation) => {
        this.pushReservation(reservation);
      });

      this.initCalendar();
      this.showSpinner = false;
      this.getActiveDay(this.activeDay);
      this.updateEvents(this.activeDay);
      setTimeout(() => {
        this.setActiveDay(null, new Date().getDate());
      });
      console.log(this.eventsArr)
    });
  }

  ngAfterViewInit(): void {}

  pushReservation(reservation: Reservation) {
    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);
    const ampmStart = startDate.getHours() >= 12 ? 'PM' : 'AM';
    const ampmEnd = endDate.getHours() >= 12 ? 'PM' : 'AM';

    const event: EventDetail = new EventDetail();
    event.title =
      reservation.idResource.codNumber + ' ' + reservation.status.toUpperCase();
    event.day = startDate.getDate();
    event.month = startDate.getMonth() + 1;
    event.year = startDate.getFullYear();
    event.startTime =
      (startDate.getHours() % 12 === 0 ? 12 : startDate.getHours() % 12) +
      ':' +
      startDate.getMinutes() +
      ' ' +
      ampmStart;
    event.endTime =
      (endDate.getHours() % 12 === 0 ? 12 : endDate.getHours() % 12) +
      ':' +
      endDate.getMinutes() +
      ' ' +
      ampmEnd;
    event.nameResource = reservation.idResource.codNumber;
    event.typeResource = reservation.idResource.idTypeResource.name;
    event.city = reservation.idResource.idLocation.idRegion.name;
    event.address = reservation.idResource.idLocation.address;
    event.place = reservation.idResource.idLocation.place;
    event.floor = reservation.idResource.idLocation.floor;
    event.status = reservation.status.toUpperCase();
    event.capacity = reservation.idResource.capacity;
    event.price = reservation.idResource.price;
    event.username = reservation.idUser.personalData.name + ' ' + reservation.idUser.personalData.lastname;

    this.eventsArr.push(event);
  }

  //function to add days
  initCalendar() {
    //to get prev month, days and current month all days and next month days
    let firstDay = new Date(this.year, this.month, 1);
    let lastDay = new Date(this.year, this.month + 1, 0);
    let prevLastDay = new Date(this.year, this.month, 0);
    let prevDays = prevLastDay.getDate();
    let lastDate = lastDay.getDate();
    let day = firstDay.getDay();
    let nextDays = 7 - lastDay.getDay() - 1;

    this.getActiveDay(this.activeDay);
    this.updateEvents(this.activeDay);

    //update date top of calendar
    this.topDate = this.months[this.month] + ' ' + this.year;

    //adding days to calendar
    //prev month days
    for (let i = day; i > 0; i--) {
      this.prevDays.push(prevDays - i + 1);
    }

    //current month days
    for (let i = 1; i <= lastDate; i++) {
      //check if there is an event
      // let event = false;
      this.eventsArr.forEach((e) => {
        if (e.day == i && e.month == this.month + 1 && e.year == this.year) {
          this.event_days.push(i);
        }
      });

      this.event_days.forEach((d) => {
        if (d == i) {
          this.isEvent = true;
        }
      });

      //if day is today add class today
      if (
        i == new Date().getDate() &&
        this.year == new Date().getFullYear() &&
        this.month == new Date().getMonth()
      ) {
        this.day_today = i;
        this.isToday = true;

        this.days.push(i);
      } else {
        //add remaining as it is
        this.days.push(i);
      }
    }

    //next month days
    for (let i = 1; i <= nextDays; i++) {
      this.nextDays.push(i);
    }
  }

  //function to prev month
  prevMonth() {
    this.clearVariables();

    this.month--;
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    }
    this.initCalendar();
  }

  //function to next month
  nextMonth() {
    this.clearVariables();

    this.month++;
    if (this.month > 11) {
      this.month = 0;
      this.year++;
    }
    this.initCalendar();
  }

  goToToday() {
    this.clearVariables();

    this.today = new Date();
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();
    this.initCalendar();

    this.setActiveDay(null, new Date().getDate());
    this.getActiveDay(this.activeDay);
    this.updateEvents(new Date().getDate());
  }

  onInput(event: any): void {
    let inputValue = event.target.value;

    if (inputValue.length === 2) {
      //add a slash if two numbers entered
      inputValue += '/';
    }

    if (
      (event as InputEvent).inputType === 'deleteContentBackward' &&
      inputValue.length === 3
    ) {
      inputValue = inputValue.slice(0, 2);
    }
    this.dateInput = inputValue;
  }

  onKeyDown(event: KeyboardEvent): void {
    //allowed only numbers and /
    const key = event.key;
    if (
      isNaN(Number(key)) &&
      key !== 'Backspace' &&
      key !== 'ArrowLeft' &&
      key !== 'ArrowRight'
    ) {
      event.preventDefault();
    }
  }

  goToDate() {
    let date = this.dateInput.split('/');

    if (date.length == 2) {
      if (
        parseInt(date[0]) > 0 &&
        parseInt(date[0]) < 13 &&
        date[1].length == 4
      ) {
        this.clearVariables();

        this.month = parseInt(date[0]) - 1;
        this.year = parseInt(date[1]);
        this.initCalendar();

        this.getActiveDay(this.activeDay);
        this.dateInput = '';
      } else {
        this.invalidDate = true;
      }
    }
  }

  setActiveDay(event: any, day: number): void {
    this.getActiveDay(day);
    this.updateEvents(day);
    this.activeDay = day;
    this.clearActiveClass();

    if (this.daysContainer) {
      if (event && event.target) {
        if (event.target.classList.contains('prev-date')) {
          this.prevMonth();

          this.clearActiveClass();
          const days =
            this.daysContainer.nativeElement.querySelectorAll('.day');

          days.forEach((d: any) => {
            if (
              !d.classList.contains('prev-date') &&
              Number(d.innerHTML) === day
            ) {
              d.classList.add('active');
            }
          });
        } else if (event.target.classList.contains('next-date')) {
          this.nextMonth();

          this.clearActiveClass();
          const days =
            this.daysContainer.nativeElement.querySelectorAll('.day');

          days.forEach((d: any) => {
            if (
              !d.classList.contains('next-date') &&
              Number(d.innerHTML) === day
            ) {
              d.classList.add('active');
            }
          });
        } else {
          event.target.classList.add('active');
        }
      } else {
        const activeDayElement =
          this.daysContainer.nativeElement.querySelector('.day.active');

        if (activeDayElement) {
          activeDayElement.classList.remove('active');
        }

        const days = this.daysContainer.nativeElement.querySelectorAll('.day');

        days.forEach((d: any) => {
          if (Number(d.innerHTML) === day) {
            d.classList.add('active');
          }
        });
      }

      this.cdr.detectChanges();
    } else {
      ('There is no container');
    }
  }

  private clearActiveClass(): void {
    if (this.daysContainer) {
      const days = this.daysContainer.nativeElement.querySelectorAll('.day');
      days.forEach((d: any) => {
        d.classList.remove('active');
      });
    } else {
      console.log('no days container');
    }
  }

  //lets show active day events and date at top
  getActiveDay(activeDay: number) {
    const day = new Date(this.year, this.month, activeDay);
    const dayName = day.toLocaleDateString('es-ES', { weekday: 'long' });

    this.event_day = dayName;
    this.event_date =
      activeDay + ' ' + this.months[this.month] + ' ' + this.year;
  }

  //function to show events of that day
  updateEvents(eventDay: number) {
    this.eventDetails = [];
    this.eventsArr.forEach((event) => {
      //gets events of active day only
      if (
        eventDay == event.day &&
        this.month + 1 == event.month &&
        this.year == event.year
      ) {
        //then show event on document
        this.eventDetails.push(event);
      }
    });

    //if nothing found
    if (this.eventDetails.length === 0) {
    }
  }

  //function to remove events on click
  cancelReservation() {}

  clearVariables() {
    this.invalidDate = false;
    this.prevDays = [];
    this.days = [];
    this.nextDays = [];
    this.isToday = false;
    this.isEvent = false;
    this.event_days = [];
    this.eventDetails = [];
  }
}
