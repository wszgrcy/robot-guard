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
import { ScheduleItemModule } from './page/schedule/item/item.module';
import { ScheduleModule } from './page/schedule/schedule.module';
import { ScheduleStore } from './store/schedule.store';
import { TaskModule } from './page/task/task.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    CyiaRepositoryModule,
    StoreModule.forRoot(getReducerMap([VariableStore,EngineNameStore,ScheduleStore]), {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    CyiaStoreModule,
    ScheduleModule,
    TaskModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
