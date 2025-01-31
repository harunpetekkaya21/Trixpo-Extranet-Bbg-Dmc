import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';


import * as L from 'leaflet';

import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'facility-general',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, CommonModule,
    FieldsetModule, MessageModule, CheckboxModule, DropdownModule, ButtonModule, InputNumberModule, DialogModule, InputTextModule, InputTextareaModule

  ],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent implements OnInit {

  //map
  displayMapDialog: boolean = false; // Harita dialog kontrolü
  map!: L.Map;
  marker!: L.Marker;
  locationName: string = ''; // Kullanıcının girdiği konum ismi


  generalTabViewForm!: FormGroup;

  facilityTypes = [
    { label: 'Hotel', value: 'hotel' },
    { label: 'Pension', value: 'pension' },
  ];

  raitingNumbers = [
    { name: '1', value: '1' },
    { name: '2', value: '2' },
    { name: '3', value: '3' },
    { name: '4', value: '4' },
    { name: '5', value: '5' }
  ];



  // Otel satışa açık mı?
  isHotelForSale: boolean = false;


  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private http: HttpClient
  ) { }


  ngOnInit(): void {
    this.initialGeneralTabViewForms();
    // Latitude ve Longitude değişimlerini dinleyip haritayı güncelle


  }

  private initialGeneralTabViewForms(): void {
    this.generalTabViewForm = this.fb.group({
      isHotelForSale: [false],
      facilityName: [null],
      facilityType: [null],
      raiting: [null],


      city: [null],
      country: [null],
      address: [null],

     
      ourEmail: [null],
      hotelOrSupplierEmail: [null],
      isBookingEmail: [false],

      supplier: [null],
      customer: [null],

      allotment: [null],
      allotmentSenderEmail: [null],
      allotmentReserverEmail: [null],

      specialNote: [null],

      latitude: ['', [Validators.required, Validators.pattern('^[0-9.-]+$')]],
      longitude: ['', [Validators.required, Validators.pattern('^[0-9.-]+$')]]

    });
  }




  // Harita açma fonksiyonu
  openMapDialog(): void {
    this.displayMapDialog = true;
    setTimeout(() => this.initializeMap(), 100); // Haritayı bir sonraki döngüde başlat
  }

  // Haritayı Başlat
  initializeMap(): void {
    if (this.map) {
      this.map.remove(); // Önceki haritayı temizle
    }

    this.map = L.map('mapContainer').setView([39.925533, 32.866287], 10); // Ankara başlangıç noktası

    // OpenStreetMap Katmanı
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    let lat = this.generalTabViewForm.get('latitude')?.value || 39.925533;
    let lng = this.generalTabViewForm.get('longitude')?.value || 32.866287;

    // Marker oluştur
    this.marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);

    // Marker sürüklendiğinde yeni koordinatları al
    this.marker.on('dragend', () => {
      const position = this.marker.getLatLng();
      this.generalTabViewForm.get('latitude')?.setValue(position.lat.toFixed(6));
      this.generalTabViewForm.get('longitude')?.setValue(position.lng.toFixed(6));
    });

    // Haritaya tıklayınca yeni marker koy
    this.map.on('click', (e: any) => {
      this.marker.setLatLng(e.latlng);
      this.generalTabViewForm.get('latitude')?.setValue(e.latlng.lat.toFixed(6));
      this.generalTabViewForm.get('longitude')?.setValue(e.latlng.lng.toFixed(6));
    });
  }

  // Konum arama fonksiyonu
  searchLocation(): void {
    if (!this.locationName.trim()) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.locationName)}`;

    this.http.get<any[]>(url).subscribe((res) => {
      if (res.length > 0) {
        const lat = res[0].lat;
        const lon = res[0].lon;

        // Haritayı yeni konuma taşı
        this.map.setView([lat, lon], 12);
        this.marker.setLatLng([lat, lon]);

        // Formdaki inputlara koordinatları ata
        this.generalTabViewForm.get('latitude')?.setValue(lat);
        this.generalTabViewForm.get('longitude')?.setValue(lon);
      }
    });
  }
  saveProfile(): void {
    if (this.generalTabViewForm.valid) {
      console.log('Saved Profile Data:', this.generalTabViewForm.value);
    } else {
      console.log('Form is invalid');
      this.generalTabViewForm.markAllAsTouched(); // Tüm alanları dokunulmuş olarak işaretler
    }
  }

  saveFacility() {
    if (this.generalTabViewForm.valid) {
      console.log('Facility Data:', this.generalTabViewForm.value);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Facility saved successfully!',
      });
      this.generalTabViewForm.reset();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please ensure all form fields are correctly filled.',
      });
    }
  }

  // Hata kontrol fonksiyonu (Kullanımı HTML'de olacak)
  isInvalid(field: string): any {
    return this.generalTabViewForm.get(field)?.invalid && this.generalTabViewForm.get(field)?.touched;
  }
}
