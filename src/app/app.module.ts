import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialExampleModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { BaseComponent } from './base-component';
import { MapObservablesComponent } from './map-observables/map-observables.component';
import { environment } from 'src/environments/environment';
import { NGXS_PLUGINS, NgxsModule } from '@ngxs/store';
import { ApplState } from './ngxs/app.state';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { getActionTypeFromInstance } from '@ngxs/store';

export class Clear {
  static readonly type = '[App] Clear';
}
export function sessionClearPlugin(state: any, action: any, next: any) {
  if (getActionTypeFromInstance(action) === '[App] Clear') {
      state = {
          assetNameGenerator: ApplState.defaultState
      };
  }
  return next(state, action);
}

@NgModule({
  declarations: [BaseComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    MapObservablesComponent,
    NgxsModule.forRoot([ApplState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      storage: StorageOption.SessionStorage
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
  ],
  providers: [
    { provide: NGXS_PLUGINS, useValue: sessionClearPlugin, multi: true }
  ],
  bootstrap: [BaseComponent],
})
export class AppModule {}
