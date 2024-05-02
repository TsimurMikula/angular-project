import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TasksReducer } from './core/states/tasks.reducer';
import { TasksEffect } from './core/states/tasks.effect';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch()), 
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync('noop'), 
    provideStore(), 
    provideState({ name: 'tasks', reducer: TasksReducer}),
    provideEffects(TasksEffect), 
  ]
};
