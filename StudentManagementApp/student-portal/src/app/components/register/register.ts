import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [FormsModule, RouterModule]
})
export class RegisterComponent {
  email = '';
  password = '';
  isSubmitting = false;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  register() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    this.auth.register(this.email, this.password).subscribe({
      next: () => {
        alert('User registered successfully'); 
        this.router.navigate(['/login']);
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('REGISTER ERROR:', err);

        const msg =
          (Array.isArray(err?.error) ? err.error.map((e: any) => e.description).join('\n') : null) ||
          (typeof err?.error === 'string' ? err.error : null) ||
          'Registration failed';

        alert(msg);
        this.isSubmitting = false;
      }
    });
  }
}
