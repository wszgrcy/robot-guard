import {
  ScheduleStepShared,
  ScheduleStep,
  ScheduleBlockStepShared,
  ScheduleEngineStepShared,
  ScheduleGlobalStepShared,
  ScheduleGlobalAction,
  ScheduleFlowStepShared,
  ActionTypeObject,
  ActionTypeEnum,
} from '@rg-share';
import { ScheduleEntity } from '@rgb-schema/schedule.enity';
import { runScript } from '@rgb-util';
import { ENGINE_MAPPING } from '../../engine/engine-mapping';
//{{xxxx}}
export class TaskRun {
  global: Record<string, any> = {};
  engineInstanceObject: Record<string, any> = {};
  engineActionVariableObject: Record<string, any>;
  constructor() {}
  // async run(id: string) {
  //   let scheduleEntity = await this.getSchedule(id);
  //   console.log(id);

  // }

  async runStep(item: ScheduleStepShared) {
    switch (item.type) {
      case ScheduleStep.block:
        await this.blockStep(item as any);
        break;
      case ScheduleStep.engine:
        await this.engineStep(item as any);
        break;
      case ScheduleStep.flow:
        await this.flowStep(item as any);
        break;
      case ScheduleStep.global:
        await this.globalStep(item as any);
        break;
      default:
        await this.blockStep(item as any);
      // throw `未知的switch分支${item}`;
    }
  }
  private async flowStep(item: ScheduleFlowStepShared) {
    if (item.action === 'if') {
      for (let index = 0; index < item.conditionList.length; index++) {
        let branch = item.conditionList[index];
        if (runScript(branch.condition, this.engineActionVariableObject)) {
          await this.runStep(branch.block);
        }
      }
    } else if (item.action === 'loop') {
      // todo loop的实现有点问题
      while (runScript(item.loopStart)) {
        await this.runStep(item.loopBlock);
      }
    } else if (item.action === 'switch') {
      let result = runScript(item.switchExpression);
      for (let i = 0; i < item.switchSteps.length; i++) {
        const element = item.switchSteps[i];
        if (element.case === result) {
          await this.runStep(element.block);
        }
      }
    }
  }
  private async globalStep(item: ScheduleGlobalStepShared) {
    if (item.action === ScheduleGlobalAction.initEngine) {
      let Engine = ENGINE_MAPPING[item.engine];
      let instance = new Engine();
      console.log('引擎初始化', item.inputVariableList[0]);
      this.engineInstanceObject[item.inputVariableList[0]] = instance;
    } else {
      throw `错误的全局动作${item.action}未实现`;
    }
  }
  private async engineStep(item: ScheduleEngineStepShared<any>) {
    let instance = this.engineInstanceObject[item.instance];
    console.log('使用引擎', instance, '引擎名', item.instance);
    console.log('方法', ActionTypeEnum[item.action]);
    console.log('输入变量', item.inputVariableList);

    // todo
    let temp = await instance[ActionTypeEnum[item.action]](
      ...(item.inputVariableList || []),
    );
    if (item.variableName) {
      this.engineActionVariableObject[item.variableName] = temp;
    }
  }
  private async blockStep(item: ScheduleBlockStepShared) {
    let result = await (item as ScheduleBlockStepShared).list.reduce(
      (pre, cur) => {
        return pre.then((item) => this.runStep(cur));
      },
      Promise.resolve(undefined),
    );
  }
}
