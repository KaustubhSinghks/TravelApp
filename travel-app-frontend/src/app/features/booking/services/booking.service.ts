import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Booking, Hotel, Cab } from '../../../shared/models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookingApiUrl = `${environment.apiUrl}/bookings`;
  private hotelApiUrl = `${environment.apiUrl}/hotels`;

  // This list should be kept in sync with your assets/hotel-images directory
  private availableCities = [
    'Bengaluru',
    'Chennai',
    'Goa',
    'Hyderabad',
    'Jaipur',
    'Kolkata',
    'Mumbai',
    'Pune',
  ];

  constructor(private http: HttpClient) {}

  getAvailableCities(): string[] {
    return this.availableCities;
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.bookingApiUrl, booking);
  }

  searchHotels(city: string): Observable<Hotel[]> {
    const params = new HttpParams().set('city', city);
    return this.http.get<Hotel[]>(`${this.hotelApiUrl}/search`, { params });
  }

  searchCabs(pickup: string, drop: string): Observable<Cab[]> {
    const mockCabs: Cab[] = [
      {
        type: 'Economy',
        pricePerDay: 1800,
        imageUrl: '/assets/cab-images/economy.png',
      },
      {
        type: 'Sedan',
        pricePerDay: 2200,
        imageUrl: 'assets/cab-images/sedan.png',
      },
      { type: 'SUV', pricePerDay: 2700, imageUrl: 'assets/cab-images/suv.png' },
    ];
    return of(mockCabs);
  }
  getBookingsByTripId(tripId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.bookingApiUrl}/trip/${tripId}`);
  }
  deleteBooking(bookingId: string): Observable<void> {
    return this.http.delete<void>(`${this.bookingApiUrl}/${bookingId}`);
  }

  getAvailableCabs(): Cab[] {
    return [
      {
        type: 'Economy',
        pricePerDay: 1800,
        imageUrl: '/assets/cab-images/economy.png',
      },
      {
        type: 'Sedan',
        pricePerDay: 2200,
        imageUrl: 'assets/cab-images/sedan.png',
      },
      { type: 'SUV', pricePerDay: 2700, imageUrl: 'assets/cab-images/suv.png' },
    ];
  }
}
