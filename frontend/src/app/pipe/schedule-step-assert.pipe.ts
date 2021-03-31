import { Pipe, PipeTransform } from '@angular/core';
import {
  ScheduleEngineStepShared,
  ScheduleFlowStepShared,
  ScheduleGlobalAction,
  ScheduleGlobalStepShared,
} from '@rg-share';

@Pipe({ name: 'isScheduleFlowStep' })
export class IsScheduleFlowStepPipe implements PipeTransform {
  transform(value: any): value is ScheduleFlowStepShared {
    return value instanceof ScheduleFlowStepShared;
  }
}
@Pipe({ name: 'isScheduleEngineStep' })
export class IsScheduleEngineStepPipe implements PipeTransform {
  transform(value: any): value is ScheduleEngineStepShared<any> {
    return value instanceof ScheduleEngineStepShared;
  }
}
@Pipe({ name: 'isScheduleGlobalStep' })
export class IsScheduleGlobalStepPipe implements PipeTransform {
  transform(value: any): value is ScheduleGlobalStepShared {
    return value instanceof ScheduleGlobalStepShared;
  }
}

@Pipe({ name: 'isScheduleFlowLoopStep' })
export class IsScheduleFlowLoopStepPipe implements PipeTransform {
  transform(value: ScheduleFlowStepShared['action']): boolean {
    return value === 'loop';
  }
}
@Pipe({ name: 'isScheduleFlowIfStep' })
export class IsScheduleFlowIfStepPipe implements PipeTransform {
  transform(value: ScheduleFlowStepShared['action']): boolean {
    return value === 'if';
  }
}
@Pipe({ name: 'isScheduleFlowSwitchStep' })
export class IsScheduleFlowSwitchStepPipe implements PipeTransform {
  transform(value: ScheduleFlowStepShared['action']): boolean {
    return value === 'switch';
  }
}
@Pipe({ name: 'isScheduleGlobalInitEngineStep' })
export class IsScheduleGlobalInitEngineStepPipe implements PipeTransform {
  transform(value: ScheduleGlobalStepShared['action']): boolean {
    return value === ScheduleGlobalAction.initEngine
  }
}

