import { Routes } from '@angular/router';
import { FacilityDetailComponent } from './facility-detail/facility-detail.component';

export const Facility_ROUTES: Routes = [
  {
      
    path: 'facility-management',
    loadComponent: () =>
      import('./facility-management/facility-management.component').then(m=>m.FacilityManagementComponent),
    // canDeactivate: [canDeactivateGuard],
      
  },
  {
      
    path: 'create-new-facility',
    loadComponent: () =>
      import('./facility-create/facility-create.component').then(m=>m.FacilityCreateComponent),
    // canDeactivate: [canDeactivateGuard],
      
  },
  {
    
    path: 'list-facilities',
    loadComponent: () =>
      import('./facility-list/facility-list.component').then(m=>m.FacilityListComponent),
    // canDeactivate: [canDeactivateGuard],
      
  },
  {
    path: 'facility-detail/:id',
    loadComponent: () =>
      import('./facility-detail/facility-detail.component').then(m => m.FacilityDetailComponent),
  },
  {
    path: 'edit-facility/:id',
    loadComponent: () =>
      import('./facility-edit/facility-edit.component').then(m => m.FacilityEditComponent),
  },

   
  ];
