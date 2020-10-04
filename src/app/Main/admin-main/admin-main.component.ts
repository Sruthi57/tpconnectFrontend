import { Component, OnInit } from '@angular/core';
import { FlightDetailsService } from '../../_services/flight-details-service.service';
import { SaveTokenService } from '../../_services/save-token.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css'],
})
export class AdminMainComponent implements OnInit {
  currentUser: any;
  FlightData = [];
  constructor(
    private token: SaveTokenService,
    private flightService: FlightDetailsService
  ) {}

  ngOnInit() {
    this.currentUser = this.token.getUser();

    this.flightService.getFlightData().subscribe((data) => {
      console.log(data);
      this.FlightData = data;
    });
  }
}
