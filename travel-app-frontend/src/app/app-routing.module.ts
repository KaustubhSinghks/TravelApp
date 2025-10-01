import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard'; // Import the guard
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  // Redirect empty path to login
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard],
  },

  {
    path: 'trips',
    loadChildren: () =>
      import('./features/trip/trip.module').then((m) => m.TripModule),
    canActivate: [AuthGuard],
  },
  { path: 'book', loadChildren: () => import('./features/booking/booking.module').then(m => m.BookingModule) },
  { path: 'book', loadChildren: () => import('./features/itinerary/itinerary.module').then(m => m.ItineraryModule) },
  { path: 'payment', loadChildren: () => import('./features/payment/payment.module').then(m => m.PaymentModule) },
  { path: '**', redirectTo: '/auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
