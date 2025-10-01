import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingHomeComponent } from './booking-home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookingService } from '../../services/booking.service';

describe('BookingHomeComponent', () => {
  let component: BookingHomeComponent;
  let fixture: ComponentFixture<BookingHomeComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [BookingHomeComponent],
      imports: [HttpClientTestingModule],
      providers: [BookingService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
