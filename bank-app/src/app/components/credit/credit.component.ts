import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule,ReactiveFormsModule]
})
export class CreditComponent {
  creditForm: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder, 
    private transactionService: TransactionService,
    private router: Router
  ) {
    this.creditForm = this.fb.group({
      senderAccount: ['', Validators.required],
      receiverAccount: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      date: new FormControl({ value: this.getCurrentTimestamp(), disabled: true })
    });
  }

  getCurrentTimestamp(): string {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  }

  onSubmit() {
    if (this.creditForm.invalid) {
      this.message = 'Please fill all fields correctly.';
      return;
    }

    const formData = this.creditForm.getRawValue();

    this.transactionService.creditTransaction(formData).subscribe({
      next: (res) => {
        this.message = 'Transaction successful!';
        this.creditForm.reset({
          senderAccount: '',
          receiverAccount: '',
          amount: '',
          date: this.getCurrentTimestamp(),
        });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.message = `Transaction failed: ${err.message || 'Please try again.'}`;
      }
    });
  }
}
