import { Component, ElementRef, OnInit } from '@angular/core';
import { UserLayoutService } from '../../services/user.layout.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-subbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './top-subbar.component.html',
  styleUrl: './top-subbar.component.scss'
})
export class TopSubBarComponent implements OnInit {
  model: any[] = [];
constructor(public layoutService: UserLayoutService, public elel: ElementRef) { }

ngOnInit() {
    this.model = [
        {
            label: 'Dashboard',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: [''] }
            ]
        },

        {
    
                    label: 'Connections',
                    icon: 'pi pi-fw pi-building',
                    items: [
                        {
                            label: 'Facility Management',
                            icon: 'pi pi-fw pi-cog',
                            routerLink: ['facilities/facility-management']
                        },
                        {
                            label: 'Create New Facility',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['facilities/create-new-facility']
                        },
                        {
                            label: 'Connected Facility List',
                            icon: 'pi pi-fw pi-list',
                            routerLink: ['facilities/list-facilities']
                        },
                        
                       

                    ]
                


            
        },

        
       
        


    ];
}
}
