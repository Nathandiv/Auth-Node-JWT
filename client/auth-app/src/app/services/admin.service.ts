import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {}
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log('API Response:', response);  // Log the response from the API
  
        const token = response.token;
        if (token) {
          console.log('Token received:', token);  // Log the received token
  
          const decodedToken: any = this.decodeToken(token);
          console.log('Decoded Token:', decodedToken);  // Log the decoded token
  
          if (decodedToken && decodedToken.isAdmin) {
            console.log('Admin detected. Saving token and navigating to admin dashboard.');
            localStorage.setItem(this.tokenKey, token);
            this.router.navigate(['/admin-dashboard']);
          } else {
            console.log('Access denied: User is not an admin.');
            alert('Access denied. Only administrators can log in.');
          }
        } else {
          console.log('Invalid credentials: No token received.');
          alert('Invalid credentials.');
        }
      })
    );
  }
  

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}
