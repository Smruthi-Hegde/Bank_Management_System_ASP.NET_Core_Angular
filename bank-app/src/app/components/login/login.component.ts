import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  imports: [FormsModule,RouterModule], 
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.formData).subscribe({
      next: (response: any) => {
        // 
        if (response && response.message === 'Login successful') {
          alert('Login successful!');
          console.log('Login successful, navigating to dashboard');
          //console.log('Login successful, navigating to dashboard');
          this.router.navigate(['/dashboard']);  // Navigate to Dashboard on successful login
        }
      },
      error: err => {
        alert('Login failed');
        console.error(err);
      }
    });
  }
}
