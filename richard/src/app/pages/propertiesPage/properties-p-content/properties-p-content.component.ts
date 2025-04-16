import { Component, OnInit } from '@angular/core';
import { Property } from '../../../models/property.model';
import { PropertyService } from '../../../services/property.service';
import { CommonModule } from '@angular/common';
import { TableContainerComponent } from '../../../shared/tableComponent/table-container/table-container.component';
import { PropertyModalComponent } from '../properties-modal/property-modal.component';

@Component({
  selector: 'app-properties-p-content',
  imports: [CommonModule, TableContainerComponent, PropertyModalComponent],
  templateUrl: './properties-p-content.component.html',
  styleUrl: './properties-p-content.component.css'
})
export class PropertiesPContentComponent implements OnInit {

  properties: Property[] = [];
  selectedProperty: Property | null = null; // Para almacenar el proyecto seleccionado
  isModalOpen = false; // Controla si el modal está abierto o cerrado

  headers = [
    { label: 'ID', key: 'id' },
    { label: 'Propiedad', key: 'name' },
    { label: 'Descripción', key: 'description' },
    { label: 'Acciones', key: 'actions' }     
  ];

  constructor(private propertyService: PropertyService) {}
  
    ngOnInit(): void {
      this.loadProperties();
    }
  
    loadProperties(): void {
      this.propertyService.getAllProperties().subscribe({
        next: (data) => {
          this.properties = data;
        },
        error: (error) => {
          console.error('Error al cargar las propiedades:', error);
        }
      });
    }
  
    openModal(property?: Property): void {
      console.log('openModal', this.isModalOpen);
      if (property) {
        this.selectedProperty = { ...property };
      } else {
        this.selectedProperty = null; 
      }
      this.isModalOpen = true;
    }
  
    closeModal(): void {
      this.isModalOpen = false;
    }
    
    createOrUpdateProperty(property: any): void {
    }

}
