import { Component, Input } from '@angular/core';
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
}
