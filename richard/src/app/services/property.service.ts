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

} 