import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { Hotel, Booking } from '../../../../shared/models/booking.model';
import { Trip } from '../../../../shared/models/trip.model';
import { TripService } from '../../../trip/services/trip.service';
import { AuthService } from '../../../auth/services/auth.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.scss'],
})
export class HotelSearchComponent implements OnInit {
  searchForm!: FormGroup;
  hotels: Hotel[] = [];
  searched = false;
  availableCities: string[] = [];

  selectedHotel: Hotel | null = null;
  userTrips: Trip[] = [];
  filteredTrips: Trip[] = [];
  selectedTripId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private tripService: TripService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.availableCities = this.bookingService.getAvailableCities();
    this.searchForm = this.fb.group({
      destination: ['', Validators.required],
    });
    this.tripService.getTrips().subscribe((trips) => (this.userTrips = trips));
  }

  onSearch(): void {
    if (this.searchForm.invalid) return;
    const destination = this.searchForm.value.destination;
    this.bookingService.searchHotels(destination).subscribe((data) => {
      this.hotels = data;
      this.searched = true;
    });
  }

  openBookingModal(hotel: Hotel): void {
    this.selectedHotel = hotel;
    this.selectedTripId = null;
    this.filteredTrips = this.userTrips.filter(
      (trip) => trip.destination.toLowerCase() === hotel.city.toLowerCase()
    );
  }

  closeBookingModal(): void {
    this.selectedHotel = null;
  }

  confirmBooking(): void {
    if (!this.selectedHotel || !this.selectedTripId) {
      this.toastService.show(
        'Please select a trip to add this booking to.',
        'error'
      );
      return;
    }

    const userId = this.authService.getUserId();
    if (!userId) {
      this.toastService.show(
        'Could not identify user. Please log in again.',
        'error'
      );
      return;
    }

    const newBooking: Booking = {
      userId: userId,
      tripId: this.selectedTripId,
      bookingType: 'HOTEL',
      details: JSON.stringify(this.selectedHotel),
      status: 'CONFIRMED',
      amount: this.selectedHotel.pricePerNight,
    };

    this.bookingService.createBooking(newBooking).subscribe(() => {
      this.toastService.show('Hotel booked successfully!', 'success');
      this.closeBookingModal();
    });
  }
}
