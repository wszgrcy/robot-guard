import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './router/task/task.module';
import { ScheduleModule } from './router/schedule/schedule.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TaskModule,
    ScheduleModule,
    MongooseModule.forRoot('mongodb://localhost:8888/robot-guard'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
