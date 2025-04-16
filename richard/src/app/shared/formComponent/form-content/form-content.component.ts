// form-content.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-content.component.html',
})
export class FormContentComponent {
  @Input() config: { key: string; label: string; type: string }[] = [];
  @Input() data: any = {};
  @Output() save = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    for (const field of this.config) {
      this.form.addControl(field.key, this.fb.control(this.data[field.key] || ''));
    }
  }

  onSave() {
    if (this.form.valid) this.save.emit(this.form.value);
  }
}
