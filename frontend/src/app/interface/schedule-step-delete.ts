import { BaseScheduleStepShared } from "@rg-share";

export interface ScheduleStepDelete{
    deleteChild(instance:BaseScheduleStepShared):void
}