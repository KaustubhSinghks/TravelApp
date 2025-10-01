import { ReactiveFormsModule } from '@angular/forms';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HotelSearchComponent } from './hotel-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookingService } from '../../services/booking.service';

describe('HotelSearchComponent', () => {
  let component: HotelSearchComponent;
  let fixture: ComponentFixture<HotelSearchComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [HotelSearchComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [BookingService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
