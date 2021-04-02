import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class TaskEntity extends Document {
  @Prop()
  name: string;
  @Prop()
  useSchedule: string;
}
export const TaskSchemaModule: ModelDefinition = {
  name: TaskEntity.name,
  schema: SchemaFactory.createForClass(TaskEntity),
};
