import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = { username: '', email: '', password: '' };
  message: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.user).subscribe(
      () => this.message = 'Login successful!',
      () => this.message = 'Login failed. Please check your credentials.'
    );
  }
}

