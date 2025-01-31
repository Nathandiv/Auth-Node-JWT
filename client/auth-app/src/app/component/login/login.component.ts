import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = { username: '', email: '', password: '' };
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    // Create a new object containing only email and password
    const loginData = {
      email: this.user.email,
      password: this.user.password,
    };

    this.authService.login(loginData).subscribe(
      (response) => {
        if (response.token) {  // Check for token in the response
          this.message = 'Login successful!';
          this.router.navigate(['/dashboard']); // Redirect on success
        } else {
          this.message = 'User does not exist or incorrect details.';
        }
      },
      (error) => {
        console.error(error); // Log the error for debugging
        this.message = 'User does not exist or incorrect details.';
      }
    );
  }
}
