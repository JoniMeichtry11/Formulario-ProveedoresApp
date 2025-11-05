import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { initializeApp } from '@angular/fire/app';
import { App } from './app/app';
import { enableProdMode } from '@angular/core';
import { environment } from './environment/environment.prod';

if (environment.production) {
  enableProdMode();
}

initializeApp(environment.firebase);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
