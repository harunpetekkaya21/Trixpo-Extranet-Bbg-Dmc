import { Component, OnInit, signal } from '@angular/core';
// PrimeNG Modules

import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

import { TabViewModule } from 'primeng/tabview';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CheckboxModule } from 'primeng/checkbox';
import { PageTitleAndInfoComponent } from '../../../../shared/components/page-title-and-info/page-title-and-info.component';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import * as L from 'leaflet';
import { DialogModule } from 'primeng/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-facility-create',
  standalone: true,
  imports: [
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    TabViewModule,
    CommonModule,
    PageTitleAndInfoComponent,
    CheckboxModule,
    FileUploadModule,
    DropdownModule,
    ChipModule,
    InputTextModule,
    InputTextareaModule,
    MessageModule,
    DialogModule
  ],
  templateUrl: './facility-create.component.html',
  styleUrls: ['./facility-create.component.scss']
})
export class FacilityCreateComponent implements OnInit {
  formHotel!: FormGroup;

  //map
  displayMapDialog: boolean = false; // Harita dialog kontrolü
  map!: L.Map;
  marker!: L.Marker;
  locationName: string = ''; // Kullanıcının girdiği konum ismi

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.formHotel = this.fb.group({
      id: ['HTL12345'],
      title:['',[Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      logo: [''],
      contact: this.fb.group({
        phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required]
      }),
      location: this.fb.group({
        latitude: ['', [Validators.required, Validators.pattern('^[0-9.-]+$')]],
        longitude: ['', [Validators.required, Validators.pattern('^[0-9.-]+$')]]
      })
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

    let lat = this.formHotel.get('location.latitude')?.value || 39.925533;
    let lng = this.formHotel.get('location.longitude')?.value || 32.866287;

    // Marker oluştur
    this.marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);

    // Marker sürüklendiğinde yeni koordinatları al
    this.marker.on('dragend', () => {
      const position = this.marker.getLatLng();
      this.formHotel.get('location.latitude')?.setValue(position.lat.toFixed(6));
      this.formHotel.get('location.longitude')?.setValue(position.lng.toFixed(6));
    });

    // Haritaya tıklayınca yeni marker koy
    this.map.on('click', (e: any) => {
      this.marker.setLatLng(e.latlng);
      this.formHotel.get('location.latitude')?.setValue(e.latlng.lat.toFixed(6));
      this.formHotel.get('location.longitude')?.setValue(e.latlng.lng.toFixed(6));
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
        this.formHotel.get('location.latitude')?.setValue(lat);
        this.formHotel.get('location.longitude')?.setValue(lon);
      }
    });
  }
  saveProfile(): void {
    if (this.formHotel.valid) {
      console.log('Saved Profile Data:', this.formHotel.value);
    } else {
      console.log('Form is invalid');
      this.formHotel.markAllAsTouched(); // Tüm alanları dokunulmuş olarak işaretler
    }
  }

  onLogoUpload(event: any): void {
    // Logo upload işlemi burada olacak
  }

  // Hata kontrol fonksiyonu (Kullanımı HTML'de olacak)
  isInvalid(field: string): any {
    return this.formHotel.get(field)?.invalid && this.formHotel.get(field)?.touched;
  }
}




