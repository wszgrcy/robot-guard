import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { CyiaRepositoryService } from 'cyia-ngx-common/repository';
import { ScheduleBlockStep } from '@rg-entity/schedule-step';
import { AddScheduleEntity, ChangeScheduleEntity, ScheduleEntityItem } from '../schedule.entity';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ScheduleItemComponent implements OnInit {
  @ViewChild('table', { static: true }) table!: MatTable<any>;
  displayedColumns: any[] = ['action', 'params'];
  dataSource: any[] = [];

  name: string = '';
  type: string = 'puppeteer';
  rootStep = new ScheduleBlockStep();
  id!: string;
  constructor(
    private http: CyiaRepositoryService,
    private activatedRoute: ActivatedRoute
  ) {
    this.rootStep.name = '根节点';
    this.activatedRoute.params.subscribe(({ id }) => {
      if (!id) {
        return;
      }
      this.id = id;
      this.http.findOne(ScheduleEntityItem, id).subscribe((item) => {
        this.rootStep = new ScheduleBlockStep(item);
      });
    });
  }

  ngOnInit(): void {}

  save() {
    console.log(this.rootStep.toRequestFormat());

    if (this.id) {
      this.http
        .findOne(ChangeScheduleEntity, this.id, this.rootStep.toRequestFormat())
        .subscribe((result) => {
          console.log(result);
        });
    } else {
      console.log(this.id);
      this.http
        .findOne(AddScheduleEntity, this.rootStep.toRequestFormat())
        .subscribe((result) => {
          console.log(result);
        });
    }
  }
}
