import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Payment } from '../../../../shared/models/payment.model';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders: Payment[] = [];
  isLoading = true;
  isDownloading: { [key: number]: boolean } = {}; // Track download state per order

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.paymentService.getMyPayments(userId).subscribe((data) => {
        this.orders = data;
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }

  downloadInvoice(paymentId: number): void {
    this.isDownloading[paymentId] = true;
    this.paymentService.generateInvoice(paymentId).subscribe({
      next: (invoiceResponse) => {
        // Use the invoice number from the response to download the PDF
        console.log('Invoice generated:', invoiceResponse);
        this.paymentService
          .downloadInvoicePdf(invoiceResponse.invoiceNumber)
          .then(() => {
            this.toastService.show('Invoice downloaded!', 'success');
          })
          .catch(() => {
            this.toastService.show('Failed to download invoice PDF.', 'error');
          })
          .finally(() => {
            this.isDownloading[paymentId] = false;
          });
      },
      error: () => {
        this.toastService.show('Failed to generate invoice.', 'error');
        this.isDownloading[paymentId] = false;
      },
    });
  }
}
