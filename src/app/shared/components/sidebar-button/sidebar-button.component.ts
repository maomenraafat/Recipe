import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar-button',
  imports: [],
  templateUrl: './sidebar-button.component.html',
  styleUrl: './sidebar-button.component.scss',
})
export class SidebarButtonComponent {
  constructor(private _sidebarService: SidebarService) {}

  toggleSidebar() {
    this._sidebarService.toggleSidebar();
  }
}
