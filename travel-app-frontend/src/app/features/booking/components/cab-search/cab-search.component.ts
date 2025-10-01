import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { Cab, Booking } from '../../../../shared/models/booking.model';
import { Trip } from '../../../../shared/models/trip.model';
import { TripService } from '../../../trip/services/trip.service';
import { AuthService } from '../../../auth/services/auth.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-cab-search',
  templateUrl: './cab-search.component.html',
  styleUrls: ['./cab-search.component.scss'],
})
export class CabSearchComponent implements OnInit {
  searchForm!: FormGroup;
  cabs: Cab[] = [];
  searched = false;
  availableCities: string[] = [];

  selectedCab: Cab | null = null;
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
      pickup: ['', Validators.required]
    });
    this.tripService.getTrips().subscribe((trips) => (this.userTrips = trips));
    this.cabs = this.bookingService.getAvailableCabs();
  }

  onSearch(): void {
    if (this.searchForm.invalid) return;
    const { pickup, drop } = this.searchForm.value;
    this.bookingService.searchCabs(pickup, drop).subscribe((data) => {
      this.cabs = data;
      this.searched = true;
    });
  }

  openBookingModal(cab: Cab): void {
    this.selectedCab = cab;
    this.selectedTripId = null;
    this.filteredTrips = this.userTrips.filter(
      (trip) => trip.destination.toLowerCase()
    );
  }

  closeBookingModal(): void {
    this.selectedCab = null;
  }

  confirmBooking(): void {
    if (!this.selectedCab || !this.selectedTripId) {
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

    const bookingDetails = {
      ...this.selectedCab,
      pickup: this.searchForm.value.pickup,
      drop: this.searchForm.value.drop,
    };

    const newBooking: Booking = {
      userId: userId,
      tripId: this.selectedTripId,
      bookingType: 'CAB',
      details: JSON.stringify(bookingDetails),
      status: 'CONFIRMED',
      amount: this.selectedCab.pricePerDay,
    };

    this.bookingService.createBooking(newBooking).subscribe(() => {
      this.toastService.show('Cab booked successfully!', 'success');
      this.closeBookingModal();
    });
  }
}
