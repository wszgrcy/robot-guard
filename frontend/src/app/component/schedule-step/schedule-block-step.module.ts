import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleBlockStepComponent } from './schedule-block-step.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { ScheduleEngineStepComponent } from './schedule-engine-step/schedule-engine-step.component';
import { ScheduleFlowStepComponent } from './schedule-flow-step/schedule-flow-step.component';
import { ScheduleGlobalStepComponent } from './schedule-global-step/schedule-global-step.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ScheduleBaseStepComponent } from './schedule-base-step/schedule-base-step.component';
import { TsCodeblockModule } from '../ts-codeblock/ts-codeblock.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    PipeModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    TsCodeblockModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule
  ],
  declarations: [
    ScheduleBlockStepComponent,
    ScheduleEngineStepComponent,
    ScheduleFlowStepComponent,
    ScheduleGlobalStepComponent,
    ScheduleBaseStepComponent,
  ],
  exports: [ScheduleBlockStepComponent],
})
export class ScheduleStepModule {}
