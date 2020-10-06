import { Component, OnInit } from '@angular/core';
import { SaveTokenService } from './_services/save-token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  username: string;

  constructor(private tokenStorageService: SaveTokenService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes('ROLE_MANAGER');

      this.username = user.username;
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
