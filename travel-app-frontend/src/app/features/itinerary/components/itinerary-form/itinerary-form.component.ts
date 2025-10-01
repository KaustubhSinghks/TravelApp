import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ItineraryItem,
  ActivityType,
} from '../../../../shared/models/itinerary.model';
import { ItineraryService } from '../../services/itinerary.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-itinerary-form',
  templateUrl: './itinerary-form.component.html',
  styleUrls: ['./itinerary-form.component.scss'],
})
export class ItineraryFormComponent implements OnInit, OnChanges {
  @Input() tripId!: string;
  @Input() dayNumber!: number;
  @Input() itemToEdit: ItineraryItem | null = null; // Input for editing
  @Output() itemAdded = new EventEmitter<ItineraryItem>();
  @Output() itemUpdated = new EventEmitter<ItineraryItem>(); // New event emitter
  @Output() closeModal = new EventEmitter<void>();

  itineraryForm!: FormGroup;
  activityTypes = Object.values(ActivityType);
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private itineraryService: ItineraryService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.itineraryForm = this.fb.group({
      time: ['', Validators.required],
      activityType: [ActivityType.SIGHTSEEING, Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
    });

    if (this.itemToEdit) {
      this.isEditMode = true;
      this.itineraryForm.patchValue(this.itemToEdit);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.itineraryForm && changes['itemToEdit']) {
      const currentItem = changes['itemToEdit'].currentValue;
      if (currentItem) {
        this.isEditMode = true;
        this.itineraryForm.patchValue(currentItem);
      } else {
        this.isEditMode = false;
        this.itineraryForm.reset({ activityType: ActivityType.SIGHTSEEING });
      }
    }
  }

  onSubmit(): void {
    if (this.itineraryForm.invalid) return;

    if (this.isEditMode && this.itemToEdit) {
      const updatedItem: ItineraryItem = {
        ...this.itemToEdit,
        ...this.itineraryForm.value,
      };
      this.itineraryService
        .updateItineraryItem(updatedItem.itemId!, updatedItem)
        .subscribe((result) => {
          this.itemUpdated.emit(result);
          this.toastService.show('Activity updated!', 'success');
        });
    } else {
      const newItem: ItineraryItem = {
        ...this.itineraryForm.value,
        tripId: this.tripId,
        dayNumber: this.dayNumber,
      };
      this.itineraryService
        .createItineraryItem(newItem)
        .subscribe((createdItem) => {
          this.itemAdded.emit(createdItem);
          this.toastService.show('Activity added to itinerary!', 'success');
        });
    }
  }
}
