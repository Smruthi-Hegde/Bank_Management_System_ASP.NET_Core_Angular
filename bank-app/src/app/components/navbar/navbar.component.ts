import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <a class="navbar-brand" href="#">MyBank</a>
      <div class="ms-auto d-flex">
        <a routerLink="/dashboard" class="nav-link text-white px-3">Dashboard</a>
        <a routerLink="/credit" class="nav-link text-white px-3">Credit</a>
        <a routerLink="/debit" class="nav-link text-white px-3">Debit</a>
        <a routerLink="/transactions" class="nav-link text-white px-3">Transactions</a>
        <a routerLink="/account-management" class="nav-link text-white px-3">Account Mgmt</a>
        <a routerLink="/login" class="nav-link text-white px-3">Logout</a>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  
}
