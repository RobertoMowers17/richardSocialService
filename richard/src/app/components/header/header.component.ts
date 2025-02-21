import { Component, inject } from '@angular/core';
import { SidebarService } from './../services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  sidebarService = inject(SidebarService);
}
