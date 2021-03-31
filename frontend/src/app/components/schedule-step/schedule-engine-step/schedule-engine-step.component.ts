import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  engineTypeOptions,
  ScheduleEngineStepShared,
  ScheduleGlobalStepShared,
} from '@rg-share';
import { CyiaStoreService } from 'cyia-ngx-common/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EngineNameStore, VariableStore } from 'src/app/store';

@Component({
  selector: 'app-schedule-engine-step',
  templateUrl: './schedule-engine-step.component.html',
  styleUrls: ['./schedule-engine-step.component.scss'],
})
export class ScheduleEngineStepComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() rgStep!: ScheduleEngineStepShared<any>;
  engineTypeOptions = engineTypeOptions;
  engineNameList$!: Observable<ScheduleGlobalStepShared[]>;
  constructor(private storeService: CyiaStoreService) {}

  ngOnInit() {
    this.engineNameList$ = this.storeService
      .select(EngineNameStore)
      .pipe(
        tap((set) => {
          console.log('查看set');
        })
      )
      .pipe(map((item) => [...item.values()]));
    this.engineNameList$.subscribe((list) => {
      console.log('列表变更');
    });
  }

  nameChange($event: string) {
    //todo 变量名变更后,需要将变量名加入到状态管理工具
    this.storeService
      .getStore(VariableStore)
      .addVariable({ name: $event, relation: this.rgStep });
  }
  ngOnDestroy(): void {
    this.storeService
      .getStore(VariableStore)
      .removeVariable({ relation: this.rgStep });
  }
  instanceChange(e: string) {
    console.log(e);
    this.engineNameList$.subscribe(
      (list) =>
        (this.rgStep.engine = list.filter(
          (item) => item.inputVariableList[0] === e
        )[0].engine)
    );
  }

  removeVariable(index: number) {
    this.rgStep.inputVariableList.splice(index, 1);
  }
  addVariable(event: MatChipInputEvent) {
    this.rgStep.inputVariableList.push(event.value);
    if (event.input) {
      event.input.value = '';
    }
  }
}
