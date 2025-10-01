import { Component, OnInit } from '@angular/core';
import { Trip } from '../../../../shared/models/trip.model';
import { TripService } from '../../services/trip.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  isLoading = true;

  constructor(
    private tripService: TripService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tripService.getTrips().subscribe((data) => {
      this.trips = data;
      this.isLoading = false;
    });
  }

  deleteTrip(event: MouseEvent, tripId: string): void {
    event.preventDefault();
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripService.deleteTrip(tripId).subscribe(() => {
        this.trips = this.trips.filter((t) => t.tripId !== tripId);
        this.toastService.show('Trip deleted successfully', 'success');
      });
    }
  }

  editTrip(event: MouseEvent, tripId: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['/trips/edit', tripId]);
  }
}
