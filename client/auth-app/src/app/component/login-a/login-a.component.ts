import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-a',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-a.component.html',
  styleUrls: ['./login-a.component.css'],
})
export class LoginAComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AdminService, private router: Router) {}

  onSubmit(): void {
    const loginData = { email: this.email, password: this.password };
    console.log(loginData);

    this.authService.login(loginData).subscribe({
      next: (response: any) => {
        if (response.token) {
          this.message = 'Login successful!';
          this.router.navigate(['/dashboard']);
        } else {
          this.message = 'Invalid credentials.';
        }
      },
      error: (error) => {
        console.error(error);
        this.message = 'An error occurred. Please try again.';
      }
    });
  }
}
