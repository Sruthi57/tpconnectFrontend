import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { SaveTokenService } from '../../_services/save-token.service';
import { FlightDetailsService } from '../../_services/flight-details-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manager-main',
  templateUrl: './manager-main.component.html',
  styleUrls: ['./manager-main.component.css'],
})
export class ManagerMainComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  isActive = true;
  constructor(
    private authService: AuthService,
    private savedToken: SaveTokenService,
    private flightService: FlightDetailsService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.savedToken.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.savedToken.getUser().roles;
    }
  }
  onSubmit() {
    console.log(this.form);
    this.flightService.addFlightDetails(this.form).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    );
    this.router.navigate(['/home']).then(() => window.location.reload());
  }
}
