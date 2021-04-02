import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ScheduleEntity extends Document {
  @Prop()
  name: string;

  @Prop()
  list: any[];
}
export class Step {
  action: string;
  params: any[];
}
export const ScheduleSchemaModule: ModelDefinition = {
  name: ScheduleEntity.name,
  schema: SchemaFactory.createForClass(ScheduleEntity),
};
