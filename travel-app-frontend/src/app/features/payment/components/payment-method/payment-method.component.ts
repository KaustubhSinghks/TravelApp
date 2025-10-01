import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentResponse } from '../../../../shared/models/payment.model';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit {
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

  selectMethod(method: 'card' | 'upi' | 'netbanking'): void {
    this.router.navigate([`/payment/${method}`], {
      state: { payment: this.payment },
    });
  }

}
