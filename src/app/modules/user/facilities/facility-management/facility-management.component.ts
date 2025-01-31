import { Component, OnInit } from '@angular/core';
import { PageTitleAndInfoComponent } from '../../../../shared/components/page-title-and-info/page-title-and-info.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Facility } from '../../../../core/models/facility/Facility';
import { FacilityService } from '../../../../core/services/facility.service';


import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { GeneralComponent } from './components/general/general.component';
import { CancellationPoliciesComponent } from './components/cancellation-policies/cancellation-policies.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { MealsComponent } from './components/meals/meals.component';
import { MiceComponent } from './components/mice/mice.component';
import { OteltypeTemasComponent } from './components/oteltype-temas/oteltype-temas.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { SupplierContractsComponent } from './components/supplier-contracts/supplier-contracts.component';
import { OpportunitiesComponent } from './components/opportunities/opportunities.component';

@Component({
  selector: 'app-facility-management',
  standalone: true,
  imports: [PageTitleAndInfoComponent,CommonModule,FormsModule,DropdownModule,StepperModule,CommonModule,ButtonModule,ProgressBarModule,ToastModule,
    GeneralComponent,OpportunitiesComponent,CancellationPoliciesComponent,DocumentsComponent,MealsComponent,MiceComponent,OteltypeTemasComponent,RoomsComponent,SupplierContractsComponent],
  templateUrl: './facility-management.component.html',
  styleUrl: './facility-management.component.scss'
})
export class FacilityManagementComponent implements OnInit{
  facilities: Facility[] = []; // Dropdown için facility listesi
  selectedFacility?: Facility;

  constructor(private facilityService: FacilityService) {}
  ngOnInit(): void {
    this.loadFacilities();
  }

 private loadFacilities(){
  this.facilityService.getFacilities().subscribe({
    next: (data) => (this.facilities = data),
    error: (err) => console.error('Error loading facilities:', err)
  });
  }

  onFacilityChange(): void {
    console.log('Selected Facility:', this.selectedFacility);
  }

}
