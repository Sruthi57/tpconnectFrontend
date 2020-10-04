import { Component, OnInit } from '@angular/core';
import { FlightDetailsService } from '../_services/flight-details-service.service';
import { SaveTokenService } from '../_services/save-token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser;
  FlightData = [];
  tableColumns: string[];
  show;
  constructor(
    private flightService: FlightDetailsService,
    private token: SaveTokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser.roles[0]);
    if (this.currentUser.roles[0] == 'ROLE_ADMIN') {
      this.tableColumns = [
        'flightNumber',
        'airplaneName',
        'startLocation',
        'destination',
        'departure',
        'arrival',
        'action',
      ];
      this.flightService.getFlightData().subscribe((data) => {
        console.log(data);
        this.FlightData = data;
      });
      this.show = false;
    } else if (this.currentUser.roles[0] == 'ROLE_MANAGER') {
      this.tableColumns = [
        'flightNumber',
        'airplaneName',
        'startLocation',
        'destination',
        'departure',
        'arrival',
      ];
      this.flightService.getFlightData().subscribe((data) => {
        console.log(data);
        this.FlightData = data;
      });
      this.show = true;
    }
  }

  delete(id) {
    console.log(id);
    this.flightService.deletFlightDetails(id).subscribe((data) => {
      console.log(data);
    });
    window.location.reload();
  }

  add() {
    this.router.navigate(['/manager']);
  }
}
