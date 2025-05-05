import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../services/event.service';
import { FormsModule } from '@angular/forms'; // <- IMPORTAR ESTO
import { Event } from '../../../models/event.model';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  startDate: string = '';
  endDate: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    const now = new Date();
    this.loadEvents(now.getFullYear(), now.getMonth() + 1);
  }

  loadEvents(year: number, month: number) {
    this.eventService.getEventsPerMonth(year, month).subscribe((res) => {
      this.events = res;
    });
  }

  onFilter() {
    if (!this.startDate || !this.endDate) return;

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    this.events = this.events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= start && eventDate <= end;
    });
  }
}
