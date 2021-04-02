import {
  EngineType,
  ScheduleGlobalAction,
  ScheduleGlobalStepShared,
  ScheduleStepShared,
} from '@rg-share';
import { NgrxAction, NgrxStore, StoreBase } from 'cyia-ngx-common/store';
@NgrxStore()
export class ScheduleStore implements StoreBase {
  readonly initState = { list: [], init: false };
  state!: { list: any[]; init: boolean };
  @NgrxAction()
  set(action: { list: any[] }) {
    this.state.list = action.list;
    this.state.init = true;
    return this.state;
  }
  // @NgrxAction()
  // removeVariable(action: { key: ScheduleGlobalStepShared }) {
  //   this.state.delete(action.key);
  //   return this.state;
  // }
}
