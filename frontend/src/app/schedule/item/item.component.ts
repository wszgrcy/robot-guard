import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {
  BaseScheduleStepShared,
  ScheduleBlockStepShared,
  ScheduleFlowStepShared,
  ScheduleGlobalStepShared,
} from '@rg-share';
import { CyiaRepositoryService } from 'cyia-ngx-common/repository';
import { AddScheduleEntity } from '../schedule.entity';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @ViewChild('table', { static: true }) table!: MatTable<any>;
  displayedColumns: any[] = ['action', 'params'];
  dataSource: any[] = [];

  name: string = '';
  type: string = 'puppeteer';
  rootStep = new ScheduleBlockStepShared();

  constructor(private http: CyiaRepositoryService) {
    this.rootStep.name = '根节点';
  }

  ngOnInit(): void {}

  save() {
    console.log('保存');
    console.log(this.rootStep.toRequestFormat());
    this.http
      .findOne(AddScheduleEntity, this.rootStep.toRequestFormat())
      .subscribe((result) => {
        console.log(result);
      });
  }
}
