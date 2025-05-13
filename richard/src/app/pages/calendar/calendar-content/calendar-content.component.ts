import { Component, OnInit, TemplateRef, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../services/event.service';
import { CalendarModalComponent } from '../calendar-modal/calendar-modal.component';

@Component({
  selector: 'app-calendar-content',
  standalone: true,
  imports: [CommonModule, CalendarModalComponent],
  templateUrl: './calendar-content.component.html',
  styleUrl: './calendar-content.component.css',
})
export class CalendarContentComponent implements OnInit {
  currentYear: number;
  currentMonth: number;
  allEvents: any[] = [];
  selectedEvents: any[] = [];
  selectedDate: Date | null = null;
  isModalOpen = false;
  eventDays: number[] = [];

  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysInMonth: number[] = [];
  emptyDays: number[] = [];

  constructor(private eventService: EventService, private eRef: ElementRef) {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    this.currentMonth = currentDate.getMonth();
  }

  ngOnInit(): void {
    this.generateCalendar();
    this.loadEvents();
  }

  get currentMonthName(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' });
  }

  generateCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const totalDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    this.emptyDays = Array(firstDay.getDay()).fill(0);
    this.daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);
  }

  loadEvents(): void {
    this.eventService.getEventsPerMonth(this.currentYear, this.currentMonth + 1).subscribe(events => {
      this.allEvents = events;
      this.eventDays = events.map(e => this.parseLocalDate(e.date).getDate());
      if (this.selectedDate) this.updateSelectedEvents(this.selectedDate);
    });
  }

  updateSelectedEvents(date: Date): void {
    const selectedDay = date.getDate();
    const selectedMonth = date.getMonth();
    const selectedYear = date.getFullYear();
  
    this.selectedEvents = this.allEvents.filter(event => {
      const eventDate = this.parseLocalDate(event.date);
      return (
        eventDate.getDate() === selectedDay &&
        eventDate.getMonth() === selectedMonth &&
        eventDate.getFullYear() === selectedYear
      );
    });
  }
  
  

  parseLocalDate(date: string | Date): Date {
    if (date instanceof Date) return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const [y, m, d] = date.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  prevMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
    this.loadEvents();
  }

  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
    this.loadEvents();
  }

  isToday(day: number): boolean {
    const today = new Date();
    return (
      this.currentYear === today.getFullYear() &&
      this.currentMonth === today.getMonth() &&
      day === today.getDate()
    );
  }

  isPast(day: number): boolean {
    const date = new Date(this.currentYear, this.currentMonth, day);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return date < today;
  }

  hasEvent(day: number): boolean {
    return this.eventDays.includes(day);
  }

  openModal(day?: number): void {
    this.selectedDate = day !== undefined
      ? new Date(this.currentYear, this.currentMonth, day)
      : new Date();

    if (this.selectedDate) this.updateSelectedEvents(this.selectedDate);
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  createEvent(eventData: any): void {
    const newEvent = { ...eventData, date: eventData.date || this.selectedDate };
    this.eventService.createEvent(newEvent).subscribe(() => {
      this.closeModal();
      this.loadEvents();
    });
  }

  @HostListener('document:click', ['$event'])
handleClickOutside(event: MouseEvent): void {
  const clickedInside = this.eRef.nativeElement.contains(event.target);
  if (!clickedInside && this.selectedDate && !this.isModalOpen) {
    this.selectedDate = null;
    this.selectedEvents = [];
  }
}

}
