import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  imports: [],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})
export class NotesListComponent {
  constructor(private router: Router) {}
  isAuthenticated: boolean = !!localStorage.getItem('token');

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
