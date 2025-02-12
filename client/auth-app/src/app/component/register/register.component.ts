import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = { username: '', email: '', password: '' };
  message: string = '';  // Add this property back to handle the message

  constructor(private authService: AuthService) {}

  onSubmit(registerForm: NgForm): void {
    if (registerForm.invalid) {
      alert('Please fill in all fields correctly.');
      return;
    }

    if (this.user.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    this.authService.register(this.user).subscribe({
      next: () => {
        this.message = 'Registration successful!';
      },
      error: () => {
        this.message = 'Registration failed. Please try again.';
      }
    });
  
    registerForm.reset(); // Reset form after successful submission
  }
}
