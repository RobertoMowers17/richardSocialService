import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalContentComponent } from '../../../shared/modalComponent/modal-content/modal-content.component';
import { EventService } from '../../../services/event.service'; // Importamos el servicio

@Component({
  selector: 'app-calendar-content',
  imports: [CommonModule, ModalContentComponent], 
  templateUrl: './calendar-content.component.html',
  styleUrl: './calendar-content.component.css'
})
export class CalendarContentComponent implements OnInit {
  currentYear: number;
  currentMonth: number;
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysInMonth: number[] = [];
  emptyDays: number[] = [];
  selectedDate: Date | null = null;
  isModalOpen = false;
  eventDays: number[] = []; // Días con eventos

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
      console.log('Eventos obtenidos:', events); // Verifica los datos recibidos
      this.eventDays = events.map(event => {
        const eventDate = new Date(event.date);
        console.log(`Evento el día ${eventDate.getDate()}`); // Verifica cada fecha
        return eventDate.getDate();
      });
    }, error => {
      console.error('Error al obtener eventos:', error);
    });
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

  openModal(day: number): void {
    if (this.isPast(day)) return;
    this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  createEvent(eventData: any): void {
    console.log('Event created:', eventData);
    this.closeModal();
    this.loadEvents(); // Recargar eventos después de crear uno nuevo
  }
}
