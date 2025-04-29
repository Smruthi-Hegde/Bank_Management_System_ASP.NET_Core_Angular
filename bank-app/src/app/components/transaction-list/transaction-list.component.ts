import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [NavbarComponent,FormsModule,CommonModule],
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
  providers: [DatePipe]
})
export class TransactionListComponent implements OnInit {
  transactions: any[] = [];

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  ngOnInit() {
    this.http.get('http://localhost:5081/api/transactions')  // or http://localhost:5081/api/transactions for HTTP
      .subscribe((response: any) => {
        this.transactions = response;
      });
  }
  

  maskAccount(account: string): string {
    return account.replace(/(\d{3})(\d{2})(\d{3})/, 'XXX-XX-$3');
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'short') || '';
  }
}
