import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-content',
  standalone: true, // Asegura que es un componente independiente
  imports: [CommonModule], 
  templateUrl: './modal-content.component.html',
  styleUrl: './modal-content.component.css'
})
export class ModalContentComponent {
  @Input() selectedDate: Date | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<any>();

  close() {
    this.closeModal.emit();
  }

  save() {
    const eventData = { date: this.selectedDate, event: 'New Event' };
    this.saveEvent.emit(eventData);
  }
}
