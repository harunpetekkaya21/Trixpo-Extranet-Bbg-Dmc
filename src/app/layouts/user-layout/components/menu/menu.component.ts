import { Component, OnInit } from '@angular/core';

import { MenuItemComponent } from './menu-item/menu-item.component';
import { NgFor, NgIf } from '@angular/common';
import { UserLayoutService } from '../../services/user.layout.service';


@Component({
    standalone: true,
    imports: [MenuItemComponent,NgIf,NgFor],
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: UserLayoutService) { }

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
