import { CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ChartData, ChartOptions } from 'chart.js';
import { MenuItem, Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { debounceTime, Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';

// Bildirim öğesi için arayüz
export interface NotificationItem {
  content: string; // Bildirim içeriği
  color: string;   // Renk (CSS sınıfı)
}

// Bildirim grubu (tarih bazlı grup)
export interface NotificationGroup {
  date: string;             // Tarih
  items: NotificationItem[]; // Bildirimlerin listesi
}



// Contract türleri için her bir detay
export interface ContractDetail {
  label: string; // Örneğin, "Total Contracts"
  progress: number; // Yüzdelik ilerleme
  progressColor: string; // İlerleme çubuğu rengi (CSS class adı)
  count: number; // Toplam sayısı
  countColor: string; // Sayı rengi (CSS class adı)
}

// ContractSummary ana yapısı
export interface ContractSummary {
  totalContracts: ContractDetail;
  totalUnapprovedContracts: ContractDetail;
  totalApprovedContracts: ContractDetail;
}


// Contract türleri için her bir detay
export interface FacilityDetail {
  label: string; // Örneğin, "Total Contracts"
  progress: number; // Yüzdelik ilerleme
  progressColor: string; // İlerleme çubuğu rengi (CSS class adı)
  count: number; // Toplam sayısı
  countColor: string; // Sayı rengi (CSS class adı)
}

// ContractSummary ana yapısı
export interface FacilitySummary {
  totalFacilities: FacilityDetail;
  totalOpenForSaleFacilities: FacilityDetail;
  totalClosedForSaleFacilities: FacilityDetail;
 
}




export interface Channel {
  name: string; // Kanal adı (örn. HMS, Public)
  progress: number; // İlerleme yüzdesi (%)
  progressColor: string; // İlerleme çubuğunun rengi (CSS sınıfı)
  count: number; // Kanalın toplam sayısı
  countColor: string; // Sayı metninin rengi (CSS sınıfı)
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule, BadgeModule, ChartModule, CommonModule, MessagesModule, TableModule, MenuModule, ButtonModule, ScrollPanelModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
 
  notifications: NotificationGroup[] = [];
  contractSummary!: ContractSummary;
  facilitySummary!: FacilitySummary;
  channels: Channel[] = []; // Kanal listesi

  //Chart
  chartData: any;
  chartOptions: any;
  subscription!: Subscription;

  //room types
  soldedRooms = 21;
  openRooms = 5;
  closedRooms = 0;
  roomTypes = [
    { type: 'Standard Triple Room', soldedRooms: 2, openRooms: 1, closedRooms: 0 },
    { type: 'Suite', soldedRooms: 6, occupied: 0, openRooms: 0 , closedRooms: 0},
    { type: 'Standard Double/Twin Room', soldedRooms: 5, openRooms: 3, closedRooms: 0 },
    { type: 'Single Room', soldedRooms: 2, occupied: 1, openRooms: 0 , closedRooms: 0},
  ];




  constructor() {

  }

  ngOnInit(): void {
    this.initChart();
    this.initNotifications();
    this.initContractSummary();
    this.initFacilitySummary();
    this.initChannels();
  }

  isVisible = true;

  closeBanner() {
    this.isVisible = false;
  }


  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        // {
        //   label: 'First Dataset',
        //   data: [65, 59, 80, 81, 56, 55, 40],
        //   fill: false,
        //   backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
        //   borderColor: documentStyle.getPropertyValue('--bluegray-700'),
        //   tension: .4
        // },
        {
          label: 'Stay Revune',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--green-600'),
          borderColor: documentStyle.getPropertyValue('--green-600'),
          tension: .4
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  initNotifications() {
    this.notifications = [
      {
        date: '01-01-2025',
        items: [
          {
            content: 'Notification 1 Notification Notification Notification',
            color: 'bg-blue-500',
          },
          {
            content: 'Notification 2 Notification Notification Notification',
            color: 'bg-orange-500',
          },
        ],
      },
      {
        date: '02-01-2025',
        items: [
          {
            content: 'Notification 3',
            color: 'bg-blue-500',
          },
          {
            content: 'Notification 4',
            color: 'bg-pink-500',
          },
          {
            content: 'Notification 5',
            color: 'bg-pink-500',
          },
          {
            content: 'Notification 6',
            color: 'bg-pink-500',
          },
        ],
      },
    ];
  }
  initContractSummary() {
    this.contractSummary = {
      totalContracts: {
        label: 'Total Contracts',
        progress: 50,
        progressColor: 'bg-orange-500',
        count: 50,
        countColor: 'text-orange-500',
      },
      totalUnapprovedContracts: {
        label: 'Total Unapproved Contracts',
        progress: 16,
        progressColor: 'bg-cyan-500',
        count: 16,
        countColor: 'text-cyan-500',
      },
      totalApprovedContracts: {
        label: 'Total Approved Contracts',
        progress: 67,
        progressColor: 'bg-pink-500',
        count: 67,
        countColor: 'text-pink-500',
      },
    };
  }
  initFacilitySummary() {
    this.facilitySummary = {
      totalFacilities: {
        label: 'Total Contracts',
        progress: 50,
        progressColor: 'bg-orange-500',
        count: 50,
        countColor: 'text-orange-500',
      },
      totalOpenForSaleFacilities: {
        label: 'Total Open For Sale Facilities',
        progress: 16,
        progressColor: 'bg-cyan-500',
        count: 16,
        countColor: 'text-cyan-500',
      },
      totalClosedForSaleFacilities: {
        label: 'Total Closed For Sale Facilities',
        progress: 67,
        progressColor: 'bg-pink-500',
        count: 67,
        countColor: 'text-pink-500',
      },
    };
  }
  initChannels(){
    this.channels = [
      {
        name: 'HMS',
        progress: 50,
        progressColor: 'bg-orange-500',
        count: 50,
        countColor: 'text-orange-500',
      },
      {
        name: 'Public',
        progress: 16,
        progressColor: 'bg-cyan-500',
        count: 16,
        countColor: 'text-cyan-500',
      },
      {
        name: 'Agency',
        progress: 67,
        progressColor: 'bg-pink-500',
        count: 67,
        countColor: 'text-pink-500',
      },
      {
        name: 'HotelBeds',
        progress: 35,
        progressColor: 'bg-green-500',
        count: 35,
        countColor: 'text-green-500',
      },
    ];
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  channelsRefresh() {

  }

}


// reminders = [
//   { priority: 'high', message: 'Complete the monthly report', color: 'red' },
//   { priority: 'medium', message: 'Meeting with the team at 3 PM', color: 'orange' },
//   { priority: 'low', message: 'Update room availability', color: 'green' },
// ];

// channels = [
//   { name: 'HMS', reservations: 5 },
//   { name: 'Public', reservations: 0 },
//   { name: 'Agency', reservations: 2 },
//   { name: 'Hotelbeds', reservations: 1 },
// ];

// roomData = {
//   total: 30,
//   occupied: 7,
//   vacant: 23,
//   blocked: 0,
//   roomTypes: [
//     { type: 'Standard Triple Room', occupied: 2, vacant: 4, blocked: 0, icon: 'pi pi-home' },
//     { type: 'Suite', occupied: 2, vacant: 6, blocked: 0, icon: 'pi pi-star' },
//     { type: 'Standard Double/Twin Room', occupied: 3, vacant: 8, blocked: 0, icon: 'pi pi-users' },
//     { type: 'Single Room', occupied: 0, vacant: 5, blocked: 0, icon: 'pi pi-user' },
//   ],
// };

// revenue = {
//   stayRevenue: 1215,
//   averageDailyRate: 243,
//   revPAR: 48.6,
// };

// // Chart Data
// revenueChartData: ChartData<'line'> = {
//   labels: ['21/01', '22/01', '23/01', '24/01', '25/01', '26/01'],
//   datasets: [
//     {
//       label: 'Stay Revenue',
//       data: [2000, 2500, 1500, 1200, 1800, 1215],
//       borderColor: '#FF6384',
//       backgroundColor: 'rgba(255, 99, 132, 0.2)',
//       tension: 0.4,
//     },
//   ],
// };

// chartOptions: ChartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
// };


