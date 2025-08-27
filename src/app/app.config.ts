import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter, withViewTransitions } from "@angular/router";
import { NgxBackButtonServiceProvider } from 'ngx-back-button'

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { // This is optional
      provide:  NgxBackButtonServiceProvider,
      useValue: {
        rootUrl: '/', // Or any custom root URL
        fallbackPrefix: '/tabs', // For library users
      },
    },
  ],
};
