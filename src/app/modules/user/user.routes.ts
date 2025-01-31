import { Routes } from '@angular/router';
import { FacilityDetailComponent } from './facilities/facility-detail/facility-detail.component';

export const USER_ROUTES: Routes = [
    {
      path: '',
      loadComponent: () =>
        import('./dashboard/dashboard.component').then(m=>m.DashboardComponent),
        // data:{preload:'true'}
    },
    {
      
      path: 'facilities',
      loadChildren: () =>
        import('./facilities/facility.routes').then(m => m.Facility_ROUTES),
        
    },
   
   
   
  ];
