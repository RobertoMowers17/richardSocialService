import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableItemComponent } from '../table-item/table-item.component';

@Component({
  selector: 'app-table-row',
  imports: [CommonModule, TableItemComponent],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.css'
})
export class TableRowComponent {
  @Input() rowData: any;
  @Input() headers!: string[];
}
