import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleSchemaModule } from '@rgb-schema/schedule.enity';
import { TaskSchemaModule } from '@rgb-schema/task.entity';
import { TaskRunService } from './task-run.service';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  imports: [
    MongooseModule.forFeature([TaskSchemaModule, ScheduleSchemaModule]),
  ],
  providers: [TaskService, TaskRunService],
})
export class TaskModule {}
