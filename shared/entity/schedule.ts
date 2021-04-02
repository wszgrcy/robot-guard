import { EngineType } from "../engine/type";
import { objectToOptions } from "../util/object-to-options";
export abstract class BaseScheduleStepShared {
  static index = 0;
  name!: string;
  constructor() {
    if (!this.name) {
      this.name = `默认步骤-${BaseScheduleStepShared.index++}`;
    }
  }
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
  loopBlock!: ScheduleBlockStepShared|undefined;
  loopStart!: string;
  loopEnd!: string;
  switchSteps!: { case?: string; block: ScheduleBlockStepShared }[];
  switchExpression!: string;
}
export class ScheduleEngineStepShared<T> extends BaseScheduleStepShared {
  type = ScheduleStep.engine;

  engine!: EngineType;
  /** 实例后的名字 */
  instance!: string;
  /** 方法 */
  action!: T;
  /** 语句执行结果的变量名 */
  variableName!: string;
  /** 方法的输入参数列表 */
  inputVariableList: any[] = [];
}
/**
 * 运行其他日程,初始化引擎,执行脚本(未来)?等
 */
export class ScheduleGlobalStepShared extends BaseScheduleStepShared {
  type = ScheduleStep.global;
  action!: ScheduleGlobalAction;
  inputVariableList: any[] = [];
  engine!: EngineType;

}
/** 仅做代码块使用 */
export class ScheduleBlockStepShared extends BaseScheduleStepShared {
  readonly type = ScheduleStep.block;
  list: ScheduleStepShared[] = [];
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
