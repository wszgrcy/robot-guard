import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleSchemaModule } from '@rgb-schema/schedule.enity';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  controllers: [ScheduleController],
  providers:[ScheduleService],
  imports: [
    MongooseModule.forFeature([ScheduleSchemaModule])
],
})
export class ScheduleModule {}
