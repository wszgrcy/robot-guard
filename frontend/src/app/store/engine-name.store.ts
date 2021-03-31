import {
  EngineType,
  ScheduleGlobalAction,
  ScheduleGlobalStepShared,
  ScheduleStepShared,
} from '@rg-share';
import { NgrxAction, NgrxStore, StoreBase } from 'cyia-ngx-common/store';
@NgrxStore()
export class EngineNameStore implements StoreBase {
  readonly initState = new Set();
  state!: Set<ScheduleGlobalStepShared>;
  @NgrxAction()
  addVariable(action: { key: ScheduleGlobalStepShared }) {
    // let list = this.state.get(action.key) || [];
    // list.push(action.name);
    // this.state.set(action.key, list);
    this.state.add(action.key);
    console.log('添加动作',action.key,this.state)
    return new Set(this.state)
  }
  @NgrxAction()
  removeVariable(action: { key: ScheduleGlobalStepShared }) {
    this.state.delete(action.key);
    return this.state;
  }
}
