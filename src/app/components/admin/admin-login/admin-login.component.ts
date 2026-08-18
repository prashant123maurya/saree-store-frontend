import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  email = '';
  password = '';

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    this.errorMessage = '';

    this.authService
      .login(this.email, this.password)
      .subscribe({

        next: (response) => {

          console.log('Login successful:', response);

          this.router.navigate(['/admin/dashboard']);

        },

        error: (error) => {

          console.log('Login error:', error);
          console.log('Status:', error.status);
          console.log('Response:', error.error);

          this.errorMessage = 'Invalid email or password';

        }

      });
  }
}