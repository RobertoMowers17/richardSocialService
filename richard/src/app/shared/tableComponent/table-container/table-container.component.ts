import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRowComponent } from '../table-row/table-row.component';

@Component({
  selector: 'app-table-container',
  imports: [CommonModule, TableRowComponent],
  templateUrl: './table-container.component.html',
  styleUrl: './table-container.component.css'
})
export class TableContainerComponent {
  @Input() title: string = 'Table Title';
  @Input() actionText: string = 'See all';
  @Input() headers: string[] = [];
  @Input() data: any[] = [];
}
