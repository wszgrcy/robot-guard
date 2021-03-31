import { EngineType } from "../engine/type";
import { objectToOptions } from "../util/object-to-options";
export abstract class BaseScheduleStepShared {
  static index = 0;
  name!: string;
  parent!: ScheduleStepShared;
  constructor() {
    if (!this.name) {
      this.name = `默认步骤-${BaseScheduleStepShared.index++}`;
    }
  }
  abstract toRequestFormat(): any;
}
/** 日程 */
export class ScheduleSharedEntity {
  name!: string;
  disabled!: boolean;
  steps!: any[];
}
export type ScheduleStepShared<T = any> =
  | ScheduleFlowStepShared
  | ScheduleEngineStepShared<T>
  | ScheduleGlobalStepShared
  | ScheduleBlockStepShared;

export class ScheduleFlowStepShared extends BaseScheduleStepShared {
  type = ScheduleStep.flow;
  action!: "if" | "loop" | "switch";
  conditionList: { condition?: string; block: ScheduleBlockStepShared }[] = [];
  loopBlock!: ScheduleBlockStepShared;
  loopStart!: string;
  loopEnd!: string;
  switchSteps!: { case?: string; block: ScheduleBlockStepShared }[];
  switchExpression!: string;
  toRequestFormat(): Record<string, any> {
    return {
      name: this.name,
      type: this.type,
      action: this.action,
      conditionList:
        this.action === "if"
          ? this.conditionList.map((item) => ({ condition: item.condition, block: item.block.toRequestFormat() }))
          : undefined,
      switchSteps:
        this.action === "switch"
          ? this.switchSteps.map((item) => ({ condition: item.case, block: item.block.toRequestFormat() }))
          : undefined,
      loopBlock: this.action === "loop" ? this.loopBlock.toRequestFormat() : undefined,
      switchExpression: this.action === "switch" ? this.switchExpression : undefined,
    };
  }
}
export class ScheduleEngineStepShared<T> extends BaseScheduleStepShared {
  type = ScheduleStep.engine;

  engine!: EngineType;
  instance!: string;
  /** todo 类型不确定 */
  action!: T;
  variableName!: string;
  inputVariableList: any[] = [];
  toRequestFormat(): Record<string, any> {
    return {
      name: this.name,
      type: this.type,
      engine: this.engine,
      instance: this.instance,
      action: this.action,
      variableName: this.variableName,
      inputVariable: this.inputVariableList,
    };
  }
}
/**
 * 运行其他日程,初始化引擎,执行脚本(未来)?等
 */
export class ScheduleGlobalStepShared extends BaseScheduleStepShared {
  type = ScheduleStep.global;
  action!: ScheduleGlobalAction;
  inputVariableList: any[] = [];
  engine!: EngineType;

  toRequestFormat(): Record<string, any> {
    return {
      name: this.name,
      type: this.type,
      action: this.action,
      inputVariable: this.inputVariableList,
      engine: this.engine,
    };
  }
}
/** 仅做代码块使用 */
export class ScheduleBlockStepShared extends BaseScheduleStepShared {
  readonly type = ScheduleStep.block;
  list: ScheduleStepShared[] = [];
  toRequestFormat(): any {
    return {
      name: this.name,
      list: this.list.map((item) => item.toRequestFormat()),
    };
  }
}
export enum ScheduleStep {
  global,
  engine,
  flow,
  block,
}
export enum ScheduleGlobalAction {
  initEngine,
}
export const ScheduleGlobalActionObject = {
  [ScheduleGlobalAction.initEngine]: {
    enum: ScheduleGlobalAction.initEngine,
    label: "初始化引擎",
    name: ScheduleGlobalAction[ScheduleGlobalAction.initEngine],
  },
};
export const scheduleGlobalActionList = objectToOptions(ScheduleGlobalActionObject, ["value", "enum"], ["label", "label"]);
