import { Component } from '@angular/core';
@Component({
  selector: 'app-booking-home',
  templateUrl: './booking-home.component.html',
  styleUrls: ['./booking-home.component.scss'],
})
export class BookingHomeComponent {
  activeTab: 'hotel' | 'cab' = 'hotel';
}
