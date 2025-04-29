import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-debit',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.css'],
  standalone: true,
})
export class DebitComponent {
  debitForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    this.debitForm = this.fb.group({
      senderAccount: ['', Validators.required],
      receiverAccount: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      date: new FormControl({ value: this.getCurrentTimestamp(), disabled: true }), // Set default date here
    });
  }

  getCurrentTimestamp(): string {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:mm for datetime-local
  }

  // onSubmit() {
  //   if (this.debitForm.invalid) {
  //     this.message = 'Please fill all fields correctly.';
  //     return;
  //   }

  //   const formData = this.debitForm.getRawValue();

  //   this.transactionService.debitTransaction(formData).subscribe({
  //     next: (res) => {
  //       this.message = 'Transaction successful!';
  //       // Reset the form and set the current date/time again after submission
  //       this.debitForm.reset({
  //         senderAccount: '',
  //         receiverAccount: '',
  //         amount: '',
  //         date: this.getCurrentTimestamp(), // Reset date to current time
  //       });
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.message = 'Transaction failed. Check inputs or try again.';
  //     }
  //   });
  // }

  onSubmit() {
    if (this.debitForm.invalid) {
      this.message = 'Please fill all fields correctly.';
      return;
    }
  
    const formData = this.debitForm.getRawValue();
  
    // Log formData to ensure it's correct before sending
    console.log('Form Data:', formData);
  
    this.transactionService.debitTransaction(formData).subscribe({
      next: (res) => {
        this.message = 'Transaction successful!';
        // Reset the form and set the current date/time again after submission
        this.debitForm.reset({
          senderAccount: '',
          receiverAccount: '',
          amount: '',
          date: this.getCurrentTimestamp(), // Reset date to current time
        });
      },
      error: (err) => {
        console.error(err);
        this.message = 'Transaction failed. Check inputs or try again.';
      }
    });
  }
  
}
