import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css']
})
export class TableContainerComponent {
  @Input() headers: any[] = [];
  @Input() data: any[] = [];
  @Input() title: string = '';
  @Input() actionText: string = 'Agregar';

  @Output() actionClick = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>();
  @Output() remove = new EventEmitter<number>();
}
