import { ReactiveFormsModule } from '@angular/forms';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItineraryFormComponent } from './itinerary-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ItineraryService } from '../../services/itinerary.service';

describe('ItineraryFormComponent', () => {
  let component: ItineraryFormComponent;
  let fixture: ComponentFixture<ItineraryFormComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ItineraryFormComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [ItineraryService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItineraryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
