import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CyiaRepositoryService } from 'cyia-ngx-common/repository';
import { CyiaStoreService } from 'cyia-ngx-common/store';
import { map } from 'rxjs/operators';
import { ScheduleStore } from 'src/app/store/schedule.store';
import { TaskItemEntity, TaskItemUpdateEntity } from '../task.entity';

@Component({
  selector: 'app-task-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() config: Partial<TaskItemEntity> = {};
  scheduleList: any[] = [];
  constructor(
    private repository: CyiaRepositoryService,
    private store: CyiaStoreService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit() {
    console.log(this.data);
    if (this.data&&this.data._id) {
      this.config.name = this.data.name;
      this.config.useSchedule = this.data.useSchedule;
    }
    // this.repository.findMany()
    this.store
      .select(ScheduleStore)
      .pipe(map((item) => item.list))
      .subscribe((result) => {
        this.scheduleList = result;
      });
  }
  save() {
    console.log(this.config);
    if (this.data && this.data._id) {
      this.repository
        .findOne(TaskItemUpdateEntity, this.data._id, this.config)
        .subscribe((item) => {
          console.log(item);
        });
    } else {
      this.repository.findOne(TaskItemEntity, this.config).subscribe((item) => {
        console.log(item);
      });
    }
  }
}
