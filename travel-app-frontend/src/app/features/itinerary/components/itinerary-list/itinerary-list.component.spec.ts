
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItineraryListComponent } from './itinerary-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ItineraryService } from '../../services/itinerary.service';

describe('ItineraryListComponent', () => {
  let component: ItineraryListComponent;
  let fixture: ComponentFixture<ItineraryListComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ItineraryListComponent],
      imports: [HttpClientTestingModule],
      providers: [ItineraryService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItineraryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
