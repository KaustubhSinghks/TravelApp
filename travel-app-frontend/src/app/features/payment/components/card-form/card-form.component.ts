import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { PaymentResponse } from '../../../../shared/models/payment.model';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
})
export class CardFormComponent implements OnInit {
  payment: PaymentResponse | null = null;
  cardForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private paymentService: PaymentService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.payment = navigation?.extras.state?.['payment'] as PaymentResponse;
  }

  ngOnInit(): void {
    if (!this.payment) {
      this.router.navigate(['/home']);
      return;
    }
    this.cardForm = this.fb.group({
      cardNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{13,19}$/)],
      ],
      cardHolderName: ['', Validators.required],
      expiryMonth: [
        '',
        [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)],
      ],
      expiryYear: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });
  }

  onSubmit(): void {
    if (this.cardForm.invalid || !this.payment) return;
    this.isLoading = true;
    this.paymentService
      .finalizeCardPayment(this.payment.paymentId, this.cardForm.value)
      .subscribe((response) => {
        this.isLoading = false;
        this.router.navigate(['/payment/success'], {
          state: { payment: response },
        });
      });
  }
}
