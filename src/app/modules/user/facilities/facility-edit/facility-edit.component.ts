import { Component } from '@angular/core';
// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-facility-edit',
  standalone: true,
   imports: [
       InputTextModule,
       PasswordModule,
       DropdownModule,
       InputNumberModule,
       TableModule,
       DialogModule,
       ButtonModule,
       ToastModule,
       CardModule,
       ToolbarModule,
       DividerModule,
       TooltipModule,
       MessageModule,
       MessagesModule,
       FieldsetModule,
       InputTextareaModule,
       CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './facility-edit.component.html',
  styleUrl: './facility-edit.component.scss'
})
export class FacilityEditComponent {
  facilityForm!: FormGroup; // Form kontrol grubu
  facilityId!: number; // Route parametresinden gelen ID


   editDialogVisible = false; // Edit dialog görünürlük kontrolü

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {

    this.facilityId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadFacilityData();

    // Facility verisini yükle
    this.loadFacilityData();

    
  }

  initForm() {
    this.facilityForm = this.fb.group({
      facilityName: ['', [Validators.required, Validators.minLength(3)]],
      facilityType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      city: ['', Validators.required],
      country: ['', Validators.required],
      address: [''],
    });
  }


  // Simüle edilen veri yükleme
  loadFacilityData() {
    const facilityData = {
      id: this.facilityId,
      name: `Facility ${this.facilityId}`,
      type: this.facilityId % 2 === 0 ? 'Hotel' : 'Pension',
      email: `facility${this.facilityId}@example.com`,
      password: 'password123',
      city: `City ${this.facilityId}`,
      country: `Country ${this.facilityId}`,
      address: `Address for Facility ${this.facilityId}`,
     
    };

    // Formu doldur
    this.facilityForm.patchValue({
      facilityName: facilityData.name,
      facilityType: facilityData.type,
      email: facilityData.email,
      password: facilityData.password,
      city: facilityData.city,
      country: facilityData.country,
      address: facilityData.address,
    });


  }



  // Kaydet
  saveFacility() {
    if (this.facilityForm.valid) {
      const updatedData = {
        ...this.facilityForm.value,
      };
      console.log('Updated Facility:', updatedData);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Facility updated successfully!',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields.',
      });
    }
  }


  
}
