import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.css']
})
export class ModalContainerComponent {
  @Input() title: string = 'Modal';
  @Input() templateRef!: TemplateRef<any>;
  @Input() config: { key: string; label: string; type: string }[] = [];
  @Input() data: any;

  @Output() closeModal = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  close() {
    this.closeModal.emit();
  }

  emitSave(data: any) {
    this.save.emit(data);
  }
}
