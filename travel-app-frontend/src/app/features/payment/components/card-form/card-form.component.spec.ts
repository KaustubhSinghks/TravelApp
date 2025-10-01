import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardFormComponent } from './card-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaymentService } from '../../services/payment.service';

describe('CardFormComponent', () => {
  let component: CardFormComponent;
  let fixture: ComponentFixture<CardFormComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [CardFormComponent],
      imports: [HttpClientTestingModule],
      providers: [PaymentService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
