import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Trip } from '../../../../shared/models/trip.model';
import { Booking } from '../../../../shared/models/booking.model';
import { ItineraryItem } from '../../../../shared/models/itinerary.model';
import { TripService } from '../../services/trip.service';
import { BookingService } from '../../../booking/services/booking.service';
import { ItineraryService } from '../../../itinerary/services/itinerary.service';
import { differenceInDays, addDays } from 'date-fns';
import { ToastService } from '../../../../shared/services/toast.service';
import { PaymentService } from '../../../payment/services/payment.service'; // Import PaymentService
import { AuthService } from '../../../auth/services/auth.service';
@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss'],
})
export class TripDetailsComponent implements OnInit {
  trip: Trip | null = null;
  bookings: Booking[] = [];
  itineraryItems: ItineraryItem[] = [];
  isLoading = true;
  editingItineraryItem: ItineraryItem | null = null;
  showItineraryForm = false;
  selectedDay: number = 1;
  isProcessingPayment = false;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private bookingService: BookingService,
    private itineraryService: ItineraryService,
    private toastService: ToastService,
    private paymentService: PaymentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (tripId) {
      this.loadData(tripId);
    }
  }

  loadData(tripId: string): void {
    this.isLoading = true;
    forkJoin({
      trip: this.tripService.getTripById(tripId),
      bookings: this.bookingService.getBookingsByTripId(tripId),
      itinerary: this.itineraryService.getItineraryForTrip(tripId),
    }).subscribe(({ trip, bookings, itinerary }) => {
      this.trip = trip;
      this.bookings = bookings;
      this.itineraryItems = itinerary;
      this.isLoading = false;
    });
  }

  get tripDurationInDays(): number[] {
    if (!this.trip) return [];
    const duration =
      differenceInDays(
        new Date(this.trip.endDate),
        new Date(this.trip.startDate)
      ) + 1;
    return Array.from({ length: duration }, (_, i) => i + 1);
  }

  getDateForDay(dayNumber: number): Date {
    if (!this.trip) return new Date();
    return addDays(new Date(this.trip.startDate), dayNumber - 1);
  }

  onItineraryItemAdded(item: ItineraryItem): void {
    this.itineraryItems.push(item);
    // Sort the list again to maintain order
    this.itineraryItems.sort((a, b) => {
      if (a.dayNumber === b.dayNumber) {
        return a.time.localeCompare(b.time);
      }
      return a.dayNumber - b.dayNumber;
    });
    this.showItineraryForm = false;
  }

  getBookingDetails(booking: Booking): any {
    try {
      return JSON.parse(booking.details);
    } catch (e) {
      return {};
    }
  }

  deleteBooking(bookingId: string): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(bookingId).subscribe(() => {
        this.bookings = this.bookings.filter((b) => b.bookingId !== bookingId);
        this.toastService.show('Booking deleted successfully', 'success');
      });
    }
  }

  handleEditItem(item: ItineraryItem): void {
    this.editingItineraryItem = item;
    this.showItineraryForm = true;
  }

  onItineraryItemUpdated(updatedItem: ItineraryItem): void {
    const index = this.itineraryItems.findIndex(
      (i) => i.itemId === updatedItem.itemId
    );
    if (index > -1) {
      this.itineraryItems[index] = updatedItem;
      this.itineraryItems.sort(
        (a, b) => a.dayNumber - b.dayNumber || a.time.localeCompare(b.time)
      );
    }
    this.closeItineraryForm();
  }
  closeItineraryForm(): void {
    this.showItineraryForm = false;
    this.editingItineraryItem = null;
  }
  onItineraryItemDeleted(itemId: string): void {
    this.itineraryItems = this.itineraryItems.filter(
      (i) => i.itemId !== itemId
    );
  }
  get tripTotalAmount(): number {
    if (!this.trip || this.bookings.length === 0) return 0;

    const tripDuration =
      differenceInDays(
        new Date(this.trip.endDate),
        new Date(this.trip.startDate)
      ) + 1;
    let totalPerDay = 0;

    this.bookings.forEach((booking) => {
      const details = this.getBookingDetails(booking);
      if (booking.bookingType === 'HOTEL') {
        totalPerDay += details.pricePerNight || 0;
      }
      if (booking.bookingType === 'CAB') {
        totalPerDay += details.pricePerDay || 0;
      }
    });

    const subTotal = totalPerDay * tripDuration;
    const gst = subTotal * 0.12;
    return subTotal + gst;
  }

  proceedToPayment(): void {
    if (!this.trip) return;
    this.isProcessingPayment = true;

    const userId = this.authService.getUserId();
    if (!userId) {
      this.toastService.show('User not found. Please log in again.', 'error');
      this.isProcessingPayment = false;
      return;
    }

    const paymentRequest = {
      tripId: this.trip.tripId!,
      userId: userId,
      amount: this.tripTotalAmount,
      created_at: new Date(), // Set current date as created_at
      paymentStatus: 'PENDING', // Default status can be set to PENDING
    };

    this.paymentService
      .initiatePayment(paymentRequest)
      .subscribe((paymentResponse) => {
        this.isProcessingPayment = false;
        // Navigate to the payment summary page, passing the payment details
        this.router.navigate(['/payment/summary'], {
          state: { payment: paymentResponse, trip: this.trip },
        });
      });
  }
}
