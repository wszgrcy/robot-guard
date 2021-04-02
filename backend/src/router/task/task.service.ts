import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskEntity, TaskSchemaModule } from '@rgb-schema/task.entity';
import {
  ScheduleEntity,
  ScheduleSchemaModule,
} from '@rgb-schema/schedule.enity';
// import { Task } from '../../schema/task/task.enity';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskSchemaModule.name) private taskModel: Model<TaskEntity>,
    @InjectModel(ScheduleSchemaModule.name)
    private scheduleModel: Model<ScheduleEntity>,
  ) {}

  async create(createCatDto): Promise<TaskEntity> {
    console.log('准备保存',createCatDto)
    const createdCat = new this.taskModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<TaskEntity[]> {
    return this.taskModel.find().exec();
  }
  async delete(_id: string) {
    return this.taskModel.findOneAndDelete({ _id });
  }
  async change(id:string, object) {
    return this.taskModel.findOneAndUpdate({ _id: id }, object);
  }
}
