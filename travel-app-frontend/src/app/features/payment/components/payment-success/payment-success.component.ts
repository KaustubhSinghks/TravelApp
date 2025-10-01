import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentResponse } from '../../../../shared/models/payment.model';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss'],
})
export class PaymentSuccessComponent implements OnInit {
  payment: PaymentResponse | null = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.payment = navigation?.extras.state?.['payment'] as PaymentResponse;
  }

  ngOnInit(): void {
    if (!this.payment) {
      this.router.navigate(['/home']);
    }
  }
}
