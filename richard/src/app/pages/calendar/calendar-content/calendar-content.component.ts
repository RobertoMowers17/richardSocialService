import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysInMonth: number[] = [];
  emptyDays: number[] = [];
  selectedDate: Date | null = null;
  isModalOpen = false;
  eventDays: number[] = [];

  @ViewChild('formTemplate') formTemplate!: TemplateRef<any>;

  constructor(private eventService: EventService) {
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
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    this.emptyDays = Array(firstDayOfMonth.getDay()).fill(0);
    this.daysInMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  loadEvents(): void {
    this.eventService.getEventsPerMonth(this.currentYear, this.currentMonth + 1).subscribe(events => {
      this.eventDays = events.map(event => this.parseLocalDate(event.date).getDate());
    }, error => {
      console.error('Error al obtener eventos:', error);
    });
  }

  // ✅ Esta función asegura que la fecha se cree en zona local (sin desfase UTC)
  parseLocalDate(dateInput: string | Date): Date {
    if (dateInput instanceof Date) {
      return new Date(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate());
    }

    const [year, month, day] = dateInput.split('-').map(Number);
    return new Date(year, month - 1, day);
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
    const selectedDate = new Date(this.currentYear, this.currentMonth, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate < today;
  }

  hasEvent(day: number): boolean {
    return this.eventDays.includes(day);
  }

  openModal(day?: number): void {
    if (day !== undefined && this.isPast(day)) return;

    this.selectedDate = day !== undefined
      ? new Date(this.currentYear, this.currentMonth, day)
      : new Date();

    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  createEvent(eventData: any): void {
    const eventWithDate = {
      ...eventData,
      date: eventData.date || this.selectedDate,
    };

    this.eventService.createEvent(eventWithDate).subscribe(() => {
      this.closeModal();
      this.loadEvents();
    }, error => {
      console.error('Error al crear el evento:', error);
    });
  }

  handleEventCreation(event: any): void {
    this.createEvent(event);
  }
}
