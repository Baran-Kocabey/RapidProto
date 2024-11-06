import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [
    { id: 1, username: 'admin', password: 'admin', role: 'admin' },
    { id: 2, username: 'user1', password: 'user1', role: 'user' },
    { id: 3, username: 'user2', password: 'user2', role: 'user' },
  ];

  private currentUser: User | null = null;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }


  canEditOrDelete(appointmentUserId: number): boolean {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return false; // Not logged in
    }
    return currentUser.role === 'admin' || currentUser.id === appointmentUserId;
  }
}
