import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import {
  ScheduleBlockStepShared,
  ScheduleFlowStepShared,
  ScheduleStepShared,
} from '@rg-share';

@Component({
  selector: 'app-schedule-flow-step',
  templateUrl: './schedule-flow-step.component.html',
  styleUrls: ['./schedule-flow-step.component.scss'],
})
export class ScheduleFlowStepComponent implements OnInit {
  @Input() rgStep!: ScheduleFlowStepShared;
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
          block: new ScheduleBlockStepShared(),
        });
        break;
      case 'loop':
        this.rgStep.loopBlock = new ScheduleBlockStepShared();
        break;
      case 'switch':
        this.rgStep.switchSteps.push({
          block: new ScheduleBlockStepShared(),
        });
        break;
      default:
        break;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {}
  actionChange(action: ScheduleFlowStepShared['action']) {
    let blockInstance = new ScheduleBlockStepShared();
    switch (action) {
      case 'if':
        this.rgStep.conditionList = [{ block: blockInstance }];
        break;
      case 'loop':
        this.rgStep.loopBlock = new ScheduleBlockStepShared();
        break;
      case 'switch':
        this.rgStep.switchSteps = [{ block: blockInstance }];
        break;
      default:
        break;
    }
  }
}
