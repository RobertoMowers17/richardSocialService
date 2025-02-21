import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-item',
  imports: [CommonModule],
  templateUrl: './table-item.component.html',
  styleUrl: './table-item.component.css'
})
export class TableItemComponent {
  @Input() value: any;

  get isIcon(): boolean {
    return typeof this.value === 'object' && this.value.icon;
  }
}
