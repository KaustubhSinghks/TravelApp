import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { PaymentResponse } from '../../../../shared/models/payment.model';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-upi-form',
  templateUrl: './upi-form.component.html',
  styleUrls: ['./upi-form.component.scss'],
})
export class UpiFormComponent implements OnInit {
  payment: PaymentResponse | null = null;
  upiForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private toastService: ToastService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.payment = navigation?.extras.state?.['payment'] as PaymentResponse;
  }

  ngOnInit(): void {
    if (!this.payment) {
      this.router.navigate(['/home']);
      return;
    }
    this.upiForm = this.fb.group({
      upiId: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.upiForm.invalid || !this.payment) return;
    this.isLoading = true;
    this.paymentService
      .finalizeUpiPayment(this.payment.paymentId, this.upiForm.value)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/payment/success'], {
            state: { payment: response },
          });
        },
        error: () => {
          this.isLoading = false;
          this.toastService.show('Payment failed. Please try again.', 'error');
        },
      });
  }
}
