import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NetbankingFormComponent } from './netbanking-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaymentService } from '../../services/payment.service';

describe('NetbankingFormComponent', () => {
  let component: NetbankingFormComponent;
  let fixture: ComponentFixture<NetbankingFormComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [NetbankingFormComponent],
      imports: [HttpClientTestingModule],
      providers: [PaymentService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetbankingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
