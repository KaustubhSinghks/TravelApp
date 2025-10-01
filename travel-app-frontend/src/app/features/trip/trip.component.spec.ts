
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripComponent } from './trip.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastService } from '../../shared/services/toast.service';
import { TripService } from './services/trip.service';
import { ActivatedRoute } from '@angular/router';

describe('TripComponent', () => {
  let component: TripComponent;
  let fixture: ComponentFixture<TripComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [TripComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        ToastService,
        TripService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'test-id' } } } },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
