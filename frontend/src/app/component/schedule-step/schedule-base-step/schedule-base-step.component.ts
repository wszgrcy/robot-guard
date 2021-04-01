import { Component, Input, OnInit } from '@angular/core';
import { ScheduleStepShared } from '@rg-share';

@Component({
  selector: 'app-schedule-base-step',
  templateUrl: './schedule-base-step.component.html',
  styleUrls: ['./schedule-base-step.component.scss']
})
export class ScheduleBaseStepComponent implements OnInit {
@Input() rgStep!:ScheduleStepShared
  constructor() { }

  ngOnInit() {
  }

}
