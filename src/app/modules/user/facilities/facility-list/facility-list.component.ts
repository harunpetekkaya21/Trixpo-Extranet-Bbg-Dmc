import { Component } from '@angular/core';
// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, LazyLoadEvent, MenuItem, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PageTitleAndInfoComponent } from '../../../../shared/components/page-title-and-info/page-title-and-info.component';
@Component({
  selector: 'app-facility-list',
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
    MenuModule,
    ConfirmDialogModule,
    CommonModule,FormsModule,ReactiveFormsModule,PageTitleAndInfoComponent],
  templateUrl: './facility-list.component.html',
  styleUrl: './facility-list.component.scss'
})
export class FacilityListComponent {
  facilities: any[] = []; // Tüm facility verisi
  totalRecords: number = 0; // Toplam facility sayısı
  loading: boolean = false; // Lazy loading işlemi sırasında gösterilecek durum

  exportMenuItems: MenuItem[] = [];

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadFacilities({ first: 0, rows: 10 }); // İlk veri yüklemesi

    this.exportMenuItems = [
      {
        label: 'Export to Excel',
        icon: 'pi pi-file-excel',
        command: () => this.exportToExcel(),
      },
      {
        label: 'Export to PDF',
        icon: 'pi pi-file-pdf',
        command: () => this.exportToPDF(),
      },
    ];
  }

  /**
   * Facility verilerini yükler.
   * @param event LazyLoadEvent - PrimeNG Table'ın gönderdiği lazy load olayı
   */
  loadFacilities(event: TableLazyLoadEvent) {
    this.loading = true;
  
    // Tür kontrolü ile `rows` değerini güvenle ele alıyoruz
    const rows = event.rows ?? 10; // Eğer `rows` null ise varsayılan olarak 10 atanır
    const start = event.first || 0;
    const end = start + rows;
  
    setTimeout(() => {
      this.facilities = Array.from({ length: 100 }).map((_, i) => ({
        id: i + 1,
        name: `Facility ${i + 1}`,
        type: i % 2 === 0 ? 'Hotel' : 'Pension',
        email: `facility${i + 1}@example.com`,
        city: `City ${i + 1}`,
        country: `Country ${i + 1}`,
        createdDate: new Date().toISOString().split('T')[0],
      })).slice(start, end);
  
      this.totalRecords = 100;
      this.loading = false;
    }, 1000);
  }
  
  exportToExcel() {
    console.log('Exporting to Excel...');
  }

  exportToPDF() {
    console.log('Exporting to PDF...');
  }

  confirm2(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this facility?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'facility deleted' });
        },
        reject: () => {
            //this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
    });
}
}
