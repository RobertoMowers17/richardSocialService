import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Property } from "../models/property.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PropertyService {
    private apiUrl = 'http://localhost:8080/properties';

    constructor(private http: HttpClient) {}

    getAllProperties(): Observable<Property[]> {
        return this.http.get<Property[]>(this.apiUrl);
    }

    // Crear una nueva propiedad
    createProperty(propertyData: Property): Observable<Property> {
        return this.http.post<Property>(this.apiUrl, propertyData);
    }

    // Actualizar una propiedad existente
    updateProperty(propertyId: number, propertyData: Property): Observable<Property> {
        return this.http.put<Property>(`${this.apiUrl}/${propertyId}`, propertyData);
    }

    // Eliminar una propiedad
    deleteProperty(propertyId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${propertyId}`);
    }
} 