import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property } from '../../../models/property.model';
import { PropertyService } from '../../../services/property.service';
import { PropertyModalComponent } from '../properties-modal/property-modal.component';
import { TableContainerComponent } from '../../../../../src/app/shared/tableComponent/table-container/table-container.component'; // <-- ESTA LÍNEA ES CLAVE

@Component({
  selector: 'app-properties-p-content',
  standalone: true,
  templateUrl: './properties-p-content.component.html',
  styleUrls: ['./properties-p-content.component.css'],
  imports: [
    CommonModule,
    PropertyModalComponent,
    TableContainerComponent // <-- IMPORTA AQUÍ EL COMPONENTE DE LA TABLA
  ]
})
export class PropertiesPContentComponent implements OnInit {
  properties: Property[] = [];
  selectedProperty: Property | null = null;
  isModalOpen = false;

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.propertyService.getAllProperties().subscribe({
      next: (data) => this.properties = data,
      error: (err) => console.error('Error al cargar propiedades:', err)
    });
  }

  openModal(property?: Property): void {
    this.selectedProperty = property ? { ...property } : null;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  createOrUpdateProperty(property: Property): void {
    if (this.selectedProperty?.id) {
      this.propertyService.updateProperty(this.selectedProperty.id, property).subscribe({
        next: (updated) => {
          const index = this.properties.findIndex(p => p.id === updated.id);
          if (index !== -1) this.properties[index] = updated;
          this.closeModal();
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      this.propertyService.createProperty(property).subscribe({
        next: (created) => {
          this.properties.push(created);
          this.closeModal();
        },
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }

  deleteProperty(id: number): void {
    this.propertyService.deleteProperty(id).subscribe({
      next: () => {
        this.properties = this.properties.filter(p => p.id !== id);
      },
      error: (err) => {
        if (err.status === 200) {
          // Workaround: backend responde 200 pero Angular lo trata como error
          this.properties = this.properties.filter(p => p.id !== id);
        } else {
          console.error('Error al eliminar:', err);
        }
      }
    });
  }
  
  
}
