import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentMethodComponent } from './payment-method.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaymentService } from '../../services/payment.service';

describe('PaymentMethodComponent', () => {
  let component: PaymentMethodComponent;
  let fixture: ComponentFixture<PaymentMethodComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [PaymentMethodComponent],
      imports: [HttpClientTestingModule],
      providers: [PaymentService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
