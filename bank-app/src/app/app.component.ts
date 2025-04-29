// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   template: `<router-outlet></router-outlet>`,
// })
// export class AppComponent {}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';  // <-- Import LoginComponent here
import { HttpClient } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],  // <-- Add LoginComponent to imports array
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}
