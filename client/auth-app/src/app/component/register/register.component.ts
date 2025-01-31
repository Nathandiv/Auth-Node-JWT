import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule], // Ensure FormsModule is imported
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = { username: '', email: '', password: '' };
  message: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.register(this.user).subscribe({
      next: () => this.message = 'Registration successful!',
      error: () => this.message = 'Registration failed. Please try again.'
    });
  }
}
