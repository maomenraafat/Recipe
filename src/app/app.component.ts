import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './shared/services/flowbite/flowbite.service';
import { AsideComponent } from './core/layout/aside/aside.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { HomeComponent } from './features/pages/home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsideComponent, FooterComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'recipe';
  _flowbiteService = inject(FlowbiteService);
  constructor() {}

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite((flowbite) => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }
}
