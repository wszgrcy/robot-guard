import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IsScheduleEngineStepPipe,
  IsScheduleFlowIfStepPipe,
  IsScheduleFlowLoopStepPipe,
  IsScheduleFlowStepPipe,
  IsScheduleFlowSwitchStepPipe,
  IsScheduleGlobalInitEngineStepPipe,
  IsScheduleGlobalStepPipe,
} from './schedule-step-assert.pipe';
import { EngineOptionPipe, EngineTypePipe } from './engine-option.pipe';
const PipeList = [
  IsScheduleFlowStepPipe,
  IsScheduleEngineStepPipe,
  IsScheduleGlobalStepPipe,
  EngineOptionPipe,
  IsScheduleFlowIfStepPipe,
  IsScheduleFlowLoopStepPipe,
  IsScheduleFlowSwitchStepPipe,
  IsScheduleGlobalInitEngineStepPipe,
  EngineTypePipe
];
@NgModule({
  declarations: [PipeList, EngineOptionPipe],
  imports: [CommonModule],
  exports: [PipeList],
  providers: [],
})
export class PipeModule {}
