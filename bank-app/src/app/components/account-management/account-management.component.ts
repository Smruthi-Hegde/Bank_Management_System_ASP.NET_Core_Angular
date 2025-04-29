import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { AccountService } from '../../services/account.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css'],
})
export class AccountManagementComponent {
  accounts: any[] = [];
  newAccount = { accountNumber: '', accountHolder: '', balance: 0 };

  editingIndex: number | null = null;
  editAccount = { accountNumber: '', accountHolder: '', balance: 0 };

  deleteIndex: number | null = null;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.loadAccounts();
  }

  // onAddAccount() {
  //   // Check if account number already exists
  //   if (this.accounts.some(account => account.accountNumber === this.newAccount.accountNumber)) {
  //     alert('Account number already exists!');
  //     return;
  //   }
    
  //   this.accounts.push({ ...this.newAccount });
  //   this.newAccount = { accountNumber: '', accountHolder: '', balance: 0 };
  // }

  // onEditAccount(index: number) {
  //   this.editingIndex = index;
  //   this.editAccount = { ...this.accounts[index] };
  // }

  // onUpdateAccount() {
  //   if (this.editingIndex !== null) {
  //     // Prevent updating with existing account number
  //     if (this.accounts.some(account => account.accountNumber === this.editAccount.accountNumber && this.accounts.indexOf(account) !== this.editingIndex)) {
  //       alert('Account number already exists!');
  //       return;
  //     }
      
  //     this.accounts[this.editingIndex] = { ...this.editAccount };
  //     this.editingIndex = null;
  //     this.editAccount = { accountNumber: '', accountHolder: '', balance: 0 };
  //   }
  // }

  // cancelEdit() {
  //   this.editingIndex = null;
  // }

  // confirmDelete(index: number) {
  //   this.deleteIndex = index;
  // }

  // cancelDelete() {
  //   this.deleteIndex = null;
  // }

  // onDeleteConfirmed() {
  //   if (this.deleteIndex !== null) {
  //     this.accounts.splice(this.deleteIndex, 1);
  //     this.deleteIndex = null;
  //   }
  // }

  loadAccounts() {
    this.accountService.getAccounts().subscribe(data => {
      this.accounts = data;
    });
  }

  onAddAccount() {
    this.accountService.addAccount(this.newAccount).subscribe(added => {
      this.accounts.push(added);
      this.newAccount = { accountNumber: '', accountHolder: '', balance: 0 };
    });
  }

  onEditAccount(index: number) {
    this.editingIndex = index;
    this.editAccount = { ...this.accounts[index] };
  }

  onUpdateAccount() {
    if (this.editingIndex !== null) {
      const accountId = this.accounts[this.editingIndex].id;
      this.accountService.updateAccount(accountId, this.editAccount).subscribe(updated => {
        this.accounts[this.editingIndex!] = updated;
        this.cancelEdit();
      });
    }
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  confirmDelete(index: number) {
    this.deleteIndex = index;
  }

  cancelDelete() {
    this.deleteIndex = null;
  }

  onDeleteConfirmed() {
    if (this.deleteIndex !== null) {
      const accountId = this.accounts[this.deleteIndex].id;
      this.accountService.deleteAccount(accountId).subscribe(() => {
        this.accounts.splice(this.deleteIndex!, 1);
        this.deleteIndex = null;
      });
    }
  }
}
