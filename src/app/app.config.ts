import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FacilityService } from './core/services/facility.service';
import { MealsService } from './core/services/meals.service';
import { OtelTemasService } from './core/services/otel-temas.service';
import { RoomTypeService } from './core/services/room-type.service';



export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    FacilityService,
    MealsService,
    OtelTemasService,
    RoomTypeService,
    ConfirmationService,
    MessageService,
     provideRouter(routes,withPreloading(PreloadAllModules)),
    provideAnimations(),
 
  ]
};