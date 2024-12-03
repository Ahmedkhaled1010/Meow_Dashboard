import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './loading.interceptor';
import { provideToastr, ToastrModule } from 'ngx-toastr';
 
export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),provideToastr(),provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),provideHttpClient(withInterceptors([loadingInterceptor])),importProvidersFrom( BrowserAnimationsModule,NgxSpinnerModule,ToastrModule)]
};
