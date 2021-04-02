import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ScheduleEntity,
  ScheduleSchemaModule,
} from '@rgb-schema/schedule.enity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(ScheduleSchemaModule.name)
    private scheduleModel: Model<ScheduleEntity>,
  ) {}

  async create(createCatDto): Promise<ScheduleEntity> {
    const createdCat = new this.scheduleModel(createCatDto);
    return createdCat.save().then((res) => {
      console.log('返回', res);
      return res;
    });
  }

  async findAll(): Promise<ScheduleEntity[]> {
    return this.scheduleModel.find({}, 'name _id').exec();
  }
  async findOne(_id): Promise<ScheduleEntity> {
    return this.scheduleModel.findOne({ _id }).exec();
  }
  async change(id, object) {
    return this.scheduleModel.findOneAndUpdate({ _id: id }, object).exec();
  }
}
