import { Component, Input, OnInit, Type } from '@angular/core';
import {
  ScheduleEngineStep,
  ScheduleFlowStep,
  ScheduleGlobalStep,
} from '@rg-entity/schedule-step';
import {
  BaseScheduleStepShared,
  ScheduleBlockStepShared,
  ScheduleEngineStepShared,
  ScheduleFlowStepShared,
  ScheduleGlobalStepShared,
  ScheduleStepShared,
} from '@rg-share';
import { ScheduleStepDelete } from '@rg-interface';
@Component({
  selector: 'app-schedule-block-step',
  templateUrl: './schedule-block-step.component.html',
  styleUrls: ['./schedule-block-step.component.scss'],
})
export class ScheduleBlockStepComponent implements OnInit, ScheduleStepDelete {
  stepList = [
    { value: ScheduleFlowStep, label: '流程控制' },
    { value: ScheduleEngineStep, label: '引擎操作' },
    { value: ScheduleGlobalStep, label: '全局管理' },
  ];
  /**
   * 默认存在一个根步骤,可以理解为一个if(true)
   * 流程控制有保存子步骤的能力
   */
  @Input() rgStep!: ScheduleBlockStepShared;
  @Input() parent!: ScheduleStepDelete;
  instance = this;
  constructor() {}

  ngOnInit() {}
  addStep(StepClass: Type<ScheduleStepShared>) {
    this.rgStep.list.push(new StepClass());
  }

  remove() {
    //移除操作,需要用状态管理调用
  }
  deleteChild(instance: BaseScheduleStepShared) {
    this.rgStep.list = this.rgStep.list.filter((item) => item !== instance);
  }
  deleteSelf() {
    this.parent.deleteChild(this.rgStep);
  }
}
