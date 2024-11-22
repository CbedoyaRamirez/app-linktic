import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RESERVATIONS } from 'src/shared/endpoint';
import { Reservation } from 'src/shared/interfaces/IReservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getReservation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${RESERVATIONS}/Booking-Reservations`);
  }

  updateReservation(item: Reservation) : Observable<Reservation> {
    return this.http.put<Reservation>(`${RESERVATIONS}/ModifyingReservations?id=${item.id}`, item);
  }

  deleteReservation(item: number) {
    return this.http.delete<Reservation[]>(`${RESERVATIONS}/CancellingReservations?id=${item}`);
  }

  createReservation(item: Reservation) : Observable<Reservation> {
    return this.http.post<Reservation>(`${RESERVATIONS}/BookingReservations`, item);
  }

}
