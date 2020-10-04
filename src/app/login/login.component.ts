import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { SaveTokenService } from '../_services/save-token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  isActive = true;
  constructor(
    private authService: AuthService,
    private savedToken: SaveTokenService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.savedToken.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.savedToken.getUser().roles;
    }
  }
  onSubmit() {
    this.authService.login(this.form).subscribe(
      (data) => {
        this.savedToken.saveToken(data.accessToken);
        this.savedToken.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.savedToken.getUser().roles;
        this.router.navigate(['/home']).then(() => window.location.reload());
        //this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
