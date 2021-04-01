import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { ScheduleBlockStep } from '@rg-entity/schedule-step';
import { ScheduleStepDelete } from '@rg-interface';
import { BaseScheduleStepShared, ScheduleFlowStepShared } from '@rg-share';

@Component({
  selector: 'app-schedule-flow-step',
  templateUrl: './schedule-flow-step.component.html',
  styleUrls: ['./schedule-flow-step.component.scss'],
})
export class ScheduleFlowStepComponent implements OnInit {
  @Input() rgStep!: ScheduleFlowStepShared;
  @Input() rgParentBlock!: ScheduleStepDelete;
  flowMethodList = [
    { label: 'if', value: 'if' },
    {
      label: 'loop',
      value: 'loop',
    },
    { label: 'switch', value: 'switch' },
  ];

  constructor() {}

  ngOnInit() {}

  addStep(action: ScheduleFlowStepShared['action']) {
    switch (action) {
      case 'if':
        this.rgStep.conditionList.push({
          block: new ScheduleBlockStep(),
        });
        break;
      case 'loop':
        this.rgStep.loopBlock = new ScheduleBlockStep();
        break;
      case 'switch':
        this.rgStep.switchSteps.push({
          block: new ScheduleBlockStep(),
        });
        break;
      default:
        break;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {}
  actionChange(action: ScheduleFlowStepShared['action']) {
    let blockInstance = new ScheduleBlockStep();
    switch (action) {
      case 'if':
        this.rgStep.conditionList = [{ block: blockInstance }];
        break;
      case 'loop':
        this.rgStep.loopBlock = new ScheduleBlockStep();
        break;
      case 'switch':
        this.rgStep.switchSteps = [{ block: blockInstance }];
        break;
      default:
        break;
    }
  }
  deleteSelf() {
    this.rgParentBlock.deleteChild(this.rgStep);
  }
  deleteChild(instance: BaseScheduleStepShared) {
    if (this.rgStep.conditionList && this.rgStep.conditionList.length) {
      this.rgStep.conditionList = this.rgStep.conditionList.filter(
        (item) => item.block !== instance
      );
    }
    if (this.rgStep.loopBlock && this.rgStep.loopBlock === instance) {
      this.rgStep.loopBlock = undefined;
    }
    if (this.rgStep.switchSteps && this.rgStep.switchSteps.length) {
      this.rgStep.switchSteps = this.rgStep.switchSteps.filter(
        (item) => item.block !== instance
      );
    }
  }
}
