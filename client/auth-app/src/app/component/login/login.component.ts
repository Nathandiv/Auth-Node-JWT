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
    this.authService.login(this.user).subscribe(
      (response) => {
        if (response.success) {
          this.message = 'Login successful!';
          this.router.navigate(['/dashboard']); // Redirect on success (adjust as needed)
        } else {
          this.message = 'User does not exist or incorrect details.';
        }
      },
      (error) => {
        this.message = 'User does not exist or incorrect details.';
      }
    );
  }
}
