import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

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
        this.message = 'Incorrect username or password. Try again.';
      }
    });
  }
}
