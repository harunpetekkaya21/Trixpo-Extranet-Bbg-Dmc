import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Facility } from '../models/facility/Facility';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  
  private facilities: Facility[] = [
    { id: '1', name: 'Rixos Hotel' },
    { id: '2', name: 'Max Royal Hotel' },
    { id: '3', name: 'Kaya Palazo Hotel' }
  ];

  constructor() {}

  // Mock API: Observable olarak facility listesini döndür
  getFacilities(): Observable<Facility[]> {
    return of(this.facilities);
  }
}
