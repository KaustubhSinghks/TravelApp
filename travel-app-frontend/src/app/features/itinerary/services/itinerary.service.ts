import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ItineraryItem } from '../../../shared/models/itinerary.model';

@Injectable({
  providedIn: 'root',
})
export class ItineraryService {
  private apiUrl = `${environment.apiUrl}/itineraries`; // Corrected spelling for consistency

  constructor(private http: HttpClient) {}

  getItineraryForTrip(tripId: string): Observable<ItineraryItem[]> {
    const params = new HttpParams().set('tripId', tripId);
    return this.http.get<ItineraryItem[]>(`${this.apiUrl}/trip`, { params });
  }

  createItineraryItem(item: ItineraryItem): Observable<ItineraryItem> {
    return this.http.post<ItineraryItem>(this.apiUrl, item);
  }

  // Add update and delete methods later as needed
  deleteItineraryItem(itemId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${itemId}`);
  }

  updateItineraryItem(itemId: string, item: ItineraryItem): Observable<ItineraryItem> {
    return this.http.put<ItineraryItem>(`${this.apiUrl}/${itemId}`, item);
  }
}
