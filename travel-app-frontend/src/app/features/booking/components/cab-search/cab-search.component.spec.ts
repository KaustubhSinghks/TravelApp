
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CabSearchComponent } from './cab-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookingService } from '../../services/booking.service';

describe('CabSearchComponent', () => {
  let component: CabSearchComponent;
  let fixture: ComponentFixture<CabSearchComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [CabSearchComponent],
      imports: [HttpClientTestingModule],
      providers: [BookingService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
