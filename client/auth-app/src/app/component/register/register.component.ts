import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user: User = { username: '', email: '', password: '' };
  message: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.register(this.user).subscribe(
      (response) => {
        this.message = 'Registration successful!';
      },
      (error) => {
        this.message = 'Registration failed.';
      }
    );
  }

}
