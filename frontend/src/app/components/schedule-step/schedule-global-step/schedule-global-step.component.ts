import { Component, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  engineTypeOptions,
  ScheduleGlobalAction,
  scheduleGlobalActionList,
  ScheduleGlobalStepShared,
} from '@rg-share';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CyiaStoreService } from 'cyia-ngx-common/store';
import { EngineNameStore } from 'src/app/store';

@Component({
  selector: 'app-schedule-global-step',
  templateUrl: './schedule-global-step.component.html',
  styleUrls: ['./schedule-global-step.component.scss'],
})
export class ScheduleGlobalStepComponent implements OnInit {
  @Input() rgStep!: ScheduleGlobalStepShared;
  scheduleGlobalActionList = scheduleGlobalActionList;
  engineTypeOptions = engineTypeOptions;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private storeService: CyiaStoreService) {}

  ngOnInit() {}
  actionChange(action: ScheduleGlobalStepShared['action']) {
    switch (action) {
      case ScheduleGlobalAction.initEngine:
        break;

      default:
        break;
    }
  }
  removeVariable(index: number) {
    this.rgStep.inputVariableList.splice(index, 1);
    if (
      this.rgStep.action === ScheduleGlobalAction.initEngine &&
      this.rgStep.inputVariableList.length === 0
    ) {
      this.storeService
        .getStore(EngineNameStore)
        .removeVariable({ key: this.rgStep });
    }
  }
  addVariable(event: MatChipInputEvent) {
    this.rgStep.inputVariableList.push(event.value);
    if (event.input) {
      event.input.value = '';
    }
    if (
      this.rgStep.action === ScheduleGlobalAction.initEngine &&
      this.rgStep.inputVariableList.length === 1
    ) {
      this.storeService
        .getStore(EngineNameStore)
        .addVariable({ key: this.rgStep });
    }
  }
  ngOnDestroy(): void {
    this.storeService
      .getStore(EngineNameStore)
      .removeVariable({ key: this.rgStep });
  }
}
