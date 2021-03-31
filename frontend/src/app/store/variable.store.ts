import { ScheduleStepShared } from '@rg-share';
import { NgrxAction, NgrxStore, StoreBase } from 'cyia-ngx-common/store';
import * as monaco from 'monaco-editor';
@NgrxStore()
export class VariableStore implements StoreBase {
  readonly initState = new Map();
  state!: Map<any, any>;
  @NgrxAction()
  addVariable(action: { name: string; relation: ScheduleStepShared }) {
    this.state.set(action.relation, action.name);
    monaco.languages.typescript.typescriptDefaults.setExtraLibs([
      {
        content: [...this.state.values()]
          .map((name: string) => `declare const ${name}:any`)
          .join(';'),
      },
    ]);
    return this.state;
  }
  @NgrxAction()
  removeVariable(action: { relation: any }) {
    this.state.delete(action.relation);
    return this.state;
  }
}
