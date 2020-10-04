import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const Flights_API = 'http://localhost:8085/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class FlightDetailsService {
  constructor(private http: HttpClient) {}

  addFlightDetails(flightData): Observable<any> {
    console.log(
      flightData.flightNumber,
      flightData.airlineName,
      flightData.startLocation,
      flightData.startTime,
      flightData.destination,
      flightData.endTime
    );
    return this.http.post(
      Flights_API + 'addFlightDetails',
      {
        flightNumber: flightData.flightNumber,
        airlineName: flightData.airlineName,
        startLocation: flightData.startLocation,
        destination: flightData.destination,
        startTime: flightData.startTime,
        endTime: flightData.endTime,
      },
      httpOptions
    );
  }

  deletFlightDetails(flightId): Observable<any> {
    return this.http.delete(
      Flights_API + 'deleteFlightData/' + flightId,

      httpOptions
    );
  }

  getFlightData(): Observable<any> {
    return this.http.get(Flights_API + 'flightlist', httpOptions);
  }
}
