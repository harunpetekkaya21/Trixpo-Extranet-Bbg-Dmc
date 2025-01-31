import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-facility-detail',
  standalone: true,
  imports: [],
  templateUrl: './facility-detail.component.html',
  styleUrl: './facility-detail.component.scss'
})
export class FacilityDetailComponent {
  facilityId!: number; // Route parametresinden alınacak ID
  facilityData: any; // Facility detayları

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // URL'den ID alınıyor
    this.facilityId = Number(this.route.snapshot.paramMap.get('id'));

    // Simüle edilen API isteği
    this.facilityData = {
      id: this.facilityId,
      name: `Facility ${this.facilityId}`,
      type: this.facilityId % 2 === 0 ? 'Hotel' : 'Pension',
      email: `facility${this.facilityId}@example.com`,
      city: `City ${this.facilityId}`,
      country: `Country ${this.facilityId}`,
      createdDate: new Date().toISOString().split('T')[0],
    };
  }
}
