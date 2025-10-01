import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user/services/user.service';
import { User } from '../../../../shared/models/user.model';
import { BookingService } from '../../../booking/services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  user: User | null = null;
  searchTerm = '';
  availableCities: string[] = [];
  suggestions: string[] = [];
  constructor(
    private userService: UserService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe((user) => {
      this.user = user;
    });
    this.availableCities = this.bookingService.getAvailableCities();
  }

  onSearchChange(): void {
    if (this.searchTerm) {
      this.suggestions = this.availableCities.filter((city) =>
        city.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(city: string): void {
    this.searchTerm = city;
    this.suggestions = [];
  }

  startPlanning(): void {
    if (this.searchTerm && this.availableCities.includes(this.searchTerm)) {
      this.router.navigate(['/trips/new'], {
        queryParams: { destination: this.searchTerm },
      });
    } else {
      this.router.navigate(['/trips/new']);
    }
  }
}
