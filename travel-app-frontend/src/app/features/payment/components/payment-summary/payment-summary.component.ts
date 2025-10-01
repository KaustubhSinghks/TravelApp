import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../../../../shared/models/trip.model';
import { PaymentResponse } from '../../../../shared/models/payment.model';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss'],
})
export class PaymentSummaryComponent implements OnInit {
  trip: Trip | null = null;
  payment: PaymentResponse | null = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      trip: Trip;
      payment: PaymentResponse;
    };
    this.trip = state?.trip;
    this.payment = state?.payment;
  }

  ngOnInit(): void {
    if (!this.trip || !this.payment) {
      this.router.navigate(['/home']); // Redirect if state is missing
    }
  }

  proceedToMethods(): void {
    this.router.navigate(['/payment/methods'], {
      state: { payment: this.payment },
    });
  }
}
