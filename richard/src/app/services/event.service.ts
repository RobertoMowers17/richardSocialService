import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/events';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventsPerMonth(year: number, month: number): Observable<Event[]> {
    const params = new HttpParams()
      .set('year', year.toString())
      .set('month', month.toString());

    return this.http.get<Event[]>(`${this.apiUrl}/bymonth`, { params });
  }

  createEvent(eventData: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, eventData);
  }

  updateEvent(eventId: number, eventData: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${eventId}`, eventData);
  }

  deleteEvent(eventId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${eventId}`);
  }
  getEventsByDate(date: Date): Observable<any[]> {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // <-- corrige mes
    const day = String(date.getDate()).padStart(2, '0');        // <-- corrige día
    const formattedDate = `${year}-${month}-${day}`;
    return this.http.get<any[]>(`${this.apiUrl}/date/${formattedDate}`);
  }
  
  
}
