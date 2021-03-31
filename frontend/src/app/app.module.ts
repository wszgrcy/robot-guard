import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CyiaRepositoryModule } from 'cyia-ngx-common/repository';
import { StoreModule } from '@ngrx/store';
import {
  CyiaStoreModule,
  CyiaStoreService,
  getReducerMap,
} from 'cyia-ngx-common/store';
import { EngineNameStore, VariableStore } from './store';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    CyiaRepositoryModule,
    StoreModule.forRoot(getReducerMap([VariableStore,EngineNameStore]), {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    CyiaStoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
