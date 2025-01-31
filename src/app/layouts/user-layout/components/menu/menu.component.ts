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
                label: '',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: [''] }
                ]
            },

            // {
            //     label: '',
            //     icon: '',
            //     items: [

            //         {
            //             label: 'Reports',
            //             icon: 'pi  pi-calendar',
            //             items: [
            //                 {
            //                     label: 'Rate Check',
            //                     icon: 'pi pi-calendar',
            //                     items: [

            //                         {
            //                             label: 'Winter',
            //                             icon: 'pi pi-book',
            //                             routerLink: ['/facility/facility-create']
            //                         },
            //                         {
            //                             label: 'Summer',
            //                             icon: 'pi pi-book',
            //                             routerLink: ['/facility/facility-create']
            //                         }
            //                     ]
            //                 },
            //                 {
            //                     label: 'Sales',
            //                     icon: 'pi pi-calendar',
            //                     items: [

            //                         {
            //                             label: 'Winter',
            //                             icon: 'pi pi-book',
            //                             routerLink: ['/facility/facility-create']
            //                         },
            //                         {
            //                             label: 'Summer',
            //                             icon: 'pi pi-book',
            //                             routerLink: ['/facility/facility-create']
            //                         }
            //                     ]
            //                 },

            //             ]
            //         },

            //     ]
            // },

            {
                label: '',
                icon: '',
                items: [

                    {
                        label: 'Facilities',
                        icon: 'pi pi-fw pi-building',
                        items: [
                            {
                                label: 'Create New Facility',
                                icon: 'pi pi-fw pi-plus-circle',
                                routerLink: ['facilities/create-new-facility']
                            },
                            {
                                label: 'Facility List',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['facilities/list-facilities']
                            },
                            
                            // {


                            //     label: 'Rooms', icon: 'pi pi-fw pi-bookmark',
                            //     items: [
                            //         { label: 'Create New Room', icon: 'pi pi-fw pi-bookmark' },
                            //         { label: 'Room Type List', icon: 'pi pi-fw pi-bookmark' },
                            //     ]
                                

                            // }


                        ]
                    },


                ]
            },

            {
                label: '',
                icon: '',
                items: [

                    {
                        label: 'Partners',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Create New Partner',
                                icon: 'pi pi-fw pi-plus-circle',
                                routerLink: ['uploads/juniper-excel']
                            },
                            {
                                label: 'Panel List',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['uploads/sejour-excel']
                            }
                        ]
                    },

                ]
            },
            {
                label: '',
                items: [
                    { label: 'Occupancy Configuration', icon: 'pi pi-fw pi-building-columns', routerLink: ['occupancy/occupancy-management'] }
                ]
            },
            {
                label: 'Our Users',
                icon: 'fa-sol fa-user',
                items: [

                    {
                        label: 'Users',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'User Management',
                                icon: 'pi pi-fw pi-plus-circle',
                                routerLink: ['users/user-management']
                            },
                            


                        ]
                    },


                ]
            },
            


            //   {
            //     label: '',
            //     icon: '',
            //     items: [

            //         {
            //             label: 'Rooms',
            //             icon: 'pi pi-fw pi-image',
            //             items: [
            //                 {
            //                     label: 'Room List',
            //                     icon: 'pi pi-fw pi-list',
            //                     routerLink: ['/room/room-list']
            //                 },
            //                 {
            //                     label: 'Create New Room',
            //                     icon: 'pi pi-fw pi-plus-circle',
            //                     routerLink: ['/room/room-create']
            //                 },

            //             ]
            //         },

            //     ]
            // },

            // {
            //     label: '',
            //     icon: '',
            //     items: [

            //         {
            //             label: 'Contracts',
            //             icon: 'pi pi-fw pi-file-edit',
            //             items: [
            //                 {
            //                     label: 'Contract List',
            //                     icon: 'pi pi-fw pi-list',
            //                     routerLink: ['/contract/contract-create']
            //                 },
            //                 {
            //                     label: 'Create New Contract',
            //                     icon: 'pi pi-fw pi-plus-circle',
            //                     routerLink: ['/contract/contract-list']
            //                 },

            //             ]
            //         },

            //     ]
            // },

        ];
    }
}
