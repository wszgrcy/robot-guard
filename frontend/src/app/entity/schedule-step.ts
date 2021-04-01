import {
  ScheduleBlockStepShared,
  ScheduleEngineStepShared,
  ScheduleFlowStepShared,
  ScheduleGlobalStepShared,
  ScheduleStep,
} from '@rg-share';

export interface RequestFormat {
  toRequestFormat(): any;
}
export class ScheduleFlowStep
  extends ScheduleFlowStepShared
  implements RequestFormat {
  constructor(config?: any) {
    super();
    if (!config) {
      return;
    }
    this.type = config.type;
    this.action = config.action;
    this.conditionList = config.conditionList
      ? config.conditionList.map((item: any) => ({
          condition: item.condition,
          block: new ScheduleBlockStep(item.block),
        }))
      : this.conditionList;
    this.switchSteps = config.switchSteps
      ? config.switchSteps.map((item: any) => ({
          condition: item.case,
          block: new ScheduleBlockStep(item.block),
        }))
      : this.switchSteps;
    this.loopBlock = config!.loopBlock
      ? new ScheduleBlockStep(config.loopBlock)
      : this.loopBlock;
    this.switchExpression = config.switchExpression;
  }
  toRequestFormat(): Record<string, any> {
    return {
      name: this.name,
      type: this.type,
      action: this.action,
      conditionList:
        this.action === 'if'
          ? this.conditionList.map((item) => ({
              condition: item.condition,
              block: (item.block as ScheduleBlockStep).toRequestFormat(),
            }))
          : undefined,
      switchSteps:
        this.action === 'switch'
          ? this.switchSteps.map((item) => ({
              condition: item.case,
              block: (item.block as ScheduleBlockStep).toRequestFormat(),
            }))
          : undefined,
      loopBlock:
        this.action === 'loop' ? (this.loopBlock as ScheduleBlockStep)!.toRequestFormat() : undefined,
      switchExpression:
        this.action === 'switch' ? this.switchExpression : undefined,
    };
  }
}
export class ScheduleEngineStep<T>
  extends ScheduleEngineStepShared<T>
  implements RequestFormat {
  constructor(config?: any) {
    super();
    if (!config) {
      return;
    }
    this.name = config.name;
    this.type = config.type;
    this.engine = config.engine;
    this.instance = config.instance;
    this.action = config.action;
    this.variableName = config.variableName;
    this.inputVariableList = config.inputVariableList || this.inputVariableList;
  }
  toRequestFormat(): Record<string, any> {
    return {
      name: this.name,
      type: this.type,
      engine: this.engine,
      instance: this.instance,
      action: this.action,
      variableName: this.variableName,
      inputVariableList: this.inputVariableList,
    };
  }
}

export class ScheduleBlockStep
  extends ScheduleBlockStepShared
  implements RequestFormat {
  constructor(config?: any) {
    super();
    if (!config) {
      return;
    }
    this.name = config.name;
    this.list =
      config.list.map((item: any): any => {
        switch (item.type) {
          case ScheduleStep.block:
            return new ScheduleBlockStep(item);
          case ScheduleStep.engine:
            return new ScheduleEngineStep(item);
          case ScheduleStep.flow:
            return new ScheduleFlowStep(item);
          case ScheduleStep.global:
            return new ScheduleGlobalStep(item);
          default:
            break;
        }
      }) || this.list;
  }
  toRequestFormat(): any {
    return {
      name: this.name,
      list: this.list.map((item) => (item as any as RequestFormat).toRequestFormat()),
    };
  }
}

export class ScheduleGlobalStep
  extends ScheduleGlobalStepShared
  implements RequestFormat {
  constructor(config?: any) {
    super();
    if (!config) {
      return;
    }
    this.name = config.name;
    this.type = config.type;
    this.action = config.action;
    this.inputVariableList = config.inputVariableList || this.inputVariableList;
    this.engine = config.engine;
  }
  toRequestFormat(): Record<string, any> {
    return {
      name: this.name,
      type: this.type,
      action: this.action,
      inputVariableList: this.inputVariableList,
      engine: this.engine,
    };
  }
}
