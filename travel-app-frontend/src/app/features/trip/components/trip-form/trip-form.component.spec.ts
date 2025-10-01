import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripFormComponent } from './trip-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastService } from '../../../../shared/services/toast.service';
import { TripService } from '../../services/trip.service';
import { ActivatedRoute } from '@angular/router';

describe('TripFormComponent', () => {
  let component: TripFormComponent;
  let fixture: ComponentFixture<TripFormComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [TripFormComponent],
  imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        ToastService,
        TripService,
  { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'test-id' } }, queryParams: { subscribe: () => {} } } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
