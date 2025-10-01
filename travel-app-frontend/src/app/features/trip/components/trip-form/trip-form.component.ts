import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { formatDate } from '@angular/common';
import { BookingService } from '../../../booking/services/booking.service';

export const dateRangeValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const startDate = control.get('startDate')?.value;
  const endDate = control.get('endDate')?.value;
  if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
    control.get('endDate')?.setErrors({ endDateBeforeStart: true });
    return { endDateBeforeStart: true };
  }
  if (control.get('endDate')?.hasError('endDateBeforeStart')) {
    control.get('endDate')?.setErrors(null);
  }
  return null;
};
export const notPastDateValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const selectedDate = control.value;
  if (!selectedDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(selectedDate) < today ? { dateInPast: true } : null;
};

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss'],
})
export class TripFormComponent implements OnInit {
  tripForm!: FormGroup;
  submitted = false;
  isEditMode = false;
  availableCities: string[] = [];
  private tripId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.tripId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.tripId;

    this.tripForm = this.fb.group(
      {
        title: ['', [Validators.required, Validators.minLength(3)]],
        destination: ['', [Validators.required, Validators.minLength(3)]],
        startDate: ['', [Validators.required, notPastDateValidator]],
        endDate: ['', Validators.required],
        numPeople: [1, [Validators.required, Validators.min(1)]],
        status: ['DRAFT', Validators.required],
      },
      { validators: dateRangeValidator }
    );

    this.route.queryParams.subscribe((params) => {
      const destination = params['destination'];
      if (destination) {
        this.tripForm.patchValue({ destination: destination });
      }
    });

    if (this.isEditMode && this.tripId) {
      this.loadTripData(this.tripId);
    }
    this.availableCities = this.bookingService.getAvailableCities();
  }

  loadTripData(id: string): void {
    this.tripService.getTripById(id).subscribe((trip) => {
      trip.startDate = formatDate(trip.startDate, 'yyyy-MM-dd', 'en-US');
      trip.endDate = formatDate(trip.endDate, 'yyyy-MM-dd', 'en-US');
      this.tripForm.patchValue(trip);
    });
  }

  get f() {
    return this.tripForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.tripForm.invalid) return;

    if (this.isEditMode && this.tripId) {
      this.tripService
        .updateTrip(this.tripId, this.tripForm.value)
        .subscribe(() => {
          this.toastService.show('Trip updated successfully!', 'success');
          this.router.navigate(['/trips']);
        });
    } else {
      // Create new trip
      this.tripService.createTrip(this.tripForm.value).subscribe(() => {
        this.toastService.show('Trip created successfully!', 'success');
        this.router.navigate(['/trips']);
      });
    }
  }
}
