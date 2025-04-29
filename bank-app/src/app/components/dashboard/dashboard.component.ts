
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls
import { NavbarComponent } from '../navbar/navbar.component';
import { environment } from '../../../environment/environment';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent], // Include Navbar
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  accountBalance: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch the account balance when the component initializes
    this.fetchAccountBalance();
  }

  // Fetch account balance from the backend
  fetchAccountBalance(): void {
    this.http.get<number>(`${environment.apiUrl}/accounts/balance`) // Replace with your API endpoint
      .subscribe({
        next: (balance: number) => {
          this.accountBalance = balance; // Assign the balance value to the component
        },
        error: (err) => {
          console.error('Failed to fetch account balance:', err);
        }
      });
  }
}
