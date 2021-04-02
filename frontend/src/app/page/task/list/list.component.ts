import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CyiaRepositoryService } from 'cyia-ngx-common/repository';
import { CyiaStoreService } from 'cyia-ngx-common/store';
import { ScheduleStore } from 'src/app/store/schedule.store';
import { ScheduleEntity } from '../../schedule/schedule.entity';
import { TaskItemComponent } from '../item/item.component';
import { TaskEntity, TaskRunEntity } from '../task.entity';

@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class TaskListComponent implements OnInit {
  dataSource: any[] = [];

  displayedColumns = ['name', 'useScheduleName','action'];

  constructor(
    private http: CyiaRepositoryService,
    private router: Router,
    private store: CyiaStoreService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.http.findMany(ScheduleEntity).subscribe((result) => {
      console.log('日程请求完成', result);
      this.store.getStore(ScheduleStore).set({ list: result });
      this.http.findMany(TaskEntity).subscribe((list) => {
        console.log(list);
        this.dataSource = list;
      });
    });
  }
  add() {
    this.dialog.open(TaskItemComponent);
  }
  change(item: any) {
    this.dialog.open(TaskItemComponent, {
      data: item,
    });
  }
  run(element: any) {
    this.http.findOne(TaskRunEntity,element._id).subscribe((item) => {
      console.log(element, item);
    });
  }
}
