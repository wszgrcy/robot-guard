import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskEntity, TaskSchemaModule } from '@rgb-schema/task.entity';
import {
  ScheduleEntity,
  ScheduleSchemaModule,
} from '@rgb-schema/schedule.enity';

import { TaskRun } from './task-run.class';

@Injectable()
export class TaskRunService {
  constructor(
    @InjectModel(TaskSchemaModule.name) private taskModel: Model<TaskEntity>,
    @InjectModel(ScheduleSchemaModule.name)
    private scheduleModel: Model<ScheduleEntity>,
  ) {}
  /** 目前的执行仅支持手动立即执行 */
  async run(id: string) {
    let taskEntity = await this.taskModel.findOne({ _id: id }, 'useSchedule');
    console.log('运行执行实体', taskEntity);
    let entity = await this.getSchedule(taskEntity.useSchedule);
    console.log('日程实体', entity);
    return new TaskRun().runStep(entity as any);
  }

  private getSchedule(_id: string) {
    return this.scheduleModel.findOne({ _id }).exec();
  }
}
