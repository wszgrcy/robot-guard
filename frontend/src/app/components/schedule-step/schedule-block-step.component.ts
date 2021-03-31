import { Component, HostBinding, Input, OnInit, Type } from '@angular/core';
import {
  ScheduleBlockStepShared,
  ScheduleEngineStepShared,
  ScheduleFlowStepShared,
  ScheduleGlobalStepShared,
  ScheduleStepShared,
} from '@rg-share';
@Component({
  selector: 'app-schedule-block-step',
  templateUrl: './schedule-block-step.component.html',
  styleUrls: ['./schedule-block-step.component.scss'],
})
export class ScheduleBlockStepComponent implements OnInit {
  stepList = [
    { value: ScheduleFlowStepShared, label: '流程控制' },
    { value: ScheduleEngineStepShared, label: '引擎操作' },
    { value: ScheduleGlobalStepShared, label: '全局管理' },
  ];
  /**
   * 默认存在一个根步骤,可以理解为一个if(true)
   * 流程控制有保存子步骤的能力
   */
  @Input() rgStep!: ScheduleBlockStepShared;
  constructor() {}

  ngOnInit() {}
  addStep(StepClass:Type<ScheduleStepShared>) {
    this.rgStep.list.push(new StepClass());
  }

  remove(){
    //移除操作,需要用状态管理调用
  }
}
