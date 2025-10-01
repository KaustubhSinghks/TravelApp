import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  PaymentInitiationRequest,
  PaymentResponse,
  CardDetails,
  UpiDetails,
  NetBankingDetails,
  Payment,
  InvoiceResponse,
} from '../../../shared/models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/v1/payments`; // Using v1 as in your backend
  private invoiceApiUrl = `${environment.apiUrl}/v1/invoices`;

  constructor(private http: HttpClient) {}

  initiatePayment(
    request: PaymentInitiationRequest
  ): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(`${this.apiUrl}/initiate`, request);
  }

  finalizeCardPayment(
    paymentId: number,
    cardDetails: CardDetails
  ): Observable<PaymentResponse> {
    return this.http.put<PaymentResponse>(
      `${this.apiUrl}/user/${paymentId}/finalize/card`,
      cardDetails
    );
  }

  // Add methods for UPI and NetBanking
  finalizeUpiPayment(
    paymentId: number,
    upiDetails: UpiDetails
  ): Observable<PaymentResponse> {
    return this.http.put<PaymentResponse>(
      `${this.apiUrl}/user/${paymentId}/finalize/upi`,
      upiDetails
    );
  }

  finalizeNetBankingPayment(
    paymentId: number,
    netBankingDetails: NetBankingDetails
  ): Observable<PaymentResponse> {
    return this.http.put<PaymentResponse>(
      `${this.apiUrl}/user/${paymentId}/finalize/netbanking`,
      netBankingDetails
    );
  }

  getMyPayments(userId: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/user/mypayments/${userId}`);
  }
  generateInvoice(paymentId: number): Observable<InvoiceResponse> {
    return this.http.post<InvoiceResponse>(
      `${this.invoiceApiUrl}/user/generate?paymentId=${paymentId}`,
      {}
    );
  }

  async downloadInvoicePdf(invoiceNumber: string): Promise<void> {
    // needs auth token:
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }
    const response = await fetch(
      `${this.invoiceApiUrl}/user/${invoiceNumber}/download`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to download invoice PDF');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceNumber}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
