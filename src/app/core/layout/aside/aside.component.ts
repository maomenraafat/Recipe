import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarService } from '../../../shared/services/sidebar/sidebar.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-aside',
  imports: [RouterLink, NgClass],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
})
export class AsideComponent {
  isOpen: boolean = false;

  constructor(private _sidebarService: SidebarService) {
    this._sidebarService.sidebarState$.subscribe((state) => {
      this.isOpen = state;
    });
  }

  closeSidebar(): void {
    this._sidebarService.toggleSidebar();
  }
}
