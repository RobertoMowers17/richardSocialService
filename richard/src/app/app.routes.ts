import { Routes } from '@angular/router';
import { EContentComponent } from './pages/events/e-content/e-content.component';
import { DContentComponent } from './pages/dashboard/d-content/d-content.component';
import { CalendarContentComponent } from './pages/calendar/calendar-content/calendar-content.component';
import { ProjectsPContentComponent } from './pages/projectsPage/projects-p-content/projects-p-content.component';
import { PropertiesPContentComponent } from './pages/propertiesPage/properties-p-content/properties-p-content.component';

export const routes: Routes = [
    { path: 'dashboard', component: DContentComponent },
    { path: 'events', component: EContentComponent },
    { path: 'calendar', component: CalendarContentComponent },
    { path: 'projects', component: ProjectsPContentComponent},
    { path: 'properties', component: PropertiesPContentComponent},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard' }
];
