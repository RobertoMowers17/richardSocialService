import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Property } from '../../../models/property.model';

@Component({
  selector: 'app-property-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './property-modal.component.html',
  styleUrls: ['./property-modal.component.css']
})
export class PropertyModalComponent {
  @Input() title = '';
  @Input() propertyData: Property | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Property>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnChanges(): void {
    if (this.propertyData) {
      this.form.patchValue({
        name: this.propertyData.name,
        description: this.propertyData.description
      });
    } else {
      this.form.reset();
    }
  }

  submit(): void {
    if (this.form.valid) {
      this.save.emit(this.form.value as Property);
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
