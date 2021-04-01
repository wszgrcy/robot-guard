import { NgModule } from '@angular/core';
import { ScheduleItemModule } from './item/item.module';
import { ScheduleListModule } from './list/list.module';

@NgModule({
  declarations: [],
  imports: [],
  exports: [ScheduleListModule, ScheduleItemModule],
})
export class ScheduleModule {}
