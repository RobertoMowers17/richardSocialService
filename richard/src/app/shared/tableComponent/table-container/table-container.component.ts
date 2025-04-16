import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-container',
  imports: [CommonModule],
  templateUrl: './table-container.component.html',
  styleUrl: './table-container.component.css'
})
export class TableContainerComponent {
  @Input() title: string = 'Table Title';
  @Input() actionText: string = 'See all';
  @Input() headers: { label: string; key: string }[] = []; 
  @Input() data: any[] = [];

  @Output() actionClick = new EventEmitter<void>();

  onActionClick(): void {
    this.actionClick.emit(); // Emitir el evento cuando se hace clic en el botón
  }
}
