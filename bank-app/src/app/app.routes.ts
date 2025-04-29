// import { Routes } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { CreditComponent } from './components/credit/credit.component';
// import { DebitComponent } from './components/debit/debit.component';
// import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
// import { AccountManagementComponent } from './components/account-management/account-management.component';

// export const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'credit', component: CreditComponent },
//   { path: 'debit', component: DebitComponent },
//   { path: 'transactions', component: TransactionListComponent },
//   { path: 'account-management', component: AccountManagementComponent }
// ];

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'credit',
    loadComponent: () =>
      import('./components/credit/credit.component').then(m => m.CreditComponent)
  },
  {
    path: 'debit',
    loadComponent: () =>
      import('./components/debit/debit.component').then(m => m.DebitComponent)
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./components/transaction-list/transaction-list.component').then(m => m.TransactionListComponent)
  },
  {
    path: 'account-management',
    loadComponent: () =>
      import('./components/account-management/account-management.component').then(m => m.AccountManagementComponent)
  }
];
