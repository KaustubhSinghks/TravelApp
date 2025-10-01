import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentSummaryComponent } from './payment-summary.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaymentService } from '../../services/payment.service';

describe('PaymentSummaryComponent', () => {
  let component: PaymentSummaryComponent;
  let fixture: ComponentFixture<PaymentSummaryComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [PaymentSummaryComponent],
      imports: [HttpClientTestingModule],
      providers: [PaymentService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
