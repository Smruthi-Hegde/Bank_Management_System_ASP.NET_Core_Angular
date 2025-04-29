import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:5081/api/transactions'; // CORRECT PORT

  constructor(private http: HttpClient) {}

  creditTransaction(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/credit`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  debitTransaction(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/debit`, data, {
     headers: { 'Content-Type': 'application/json' }
    });
  }
  

  getTransactionList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
}
