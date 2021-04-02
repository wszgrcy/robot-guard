import { TASK_ROUTER_PATH } from '@rg-share';
import {
  ClassDataSource,
  PropertyDataSource,
} from 'cyia-ngx-common/repository';
import { CyiaStoreService } from 'cyia-ngx-common/store';
import { of } from 'rxjs';
import { filter, map, skip, skipWhile, take, tap } from 'rxjs/operators';
import { ScheduleStore } from 'src/app/store/schedule.store';

@ClassDataSource({
  source: (http) => {
    return http.get(`http://127.0.0.1:3000/${TASK_ROUTER_PATH}`);
  },
})
export class TaskEntity {
  name!: string;

  useSchedule!: string;
  @PropertyDataSource({
    source: () => of(undefined),

    itemSelect: (thisItem, key, index, result, http, injector) => {
      console.log(thisItem, key, index, result);
      return injector
        .get(CyiaStoreService)
        .select(ScheduleStore)
        .pipe(
          tap((result) => {
            console.log('查看日程', result);
          }),
          filter((item) => item.init),
          take(1),
          map((item) => item.list),
          map(
            (list) =>
              list.find((item) => item._id === thisItem.useSchedule)?.name
          )
        );
    },
  })
  useScheduleName!: string;
}
@ClassDataSource({
  source: (http, injector, body) => {
    return http.post(`http://127.0.0.1:3000/${TASK_ROUTER_PATH}`, body);
  },
})
export class TaskItemEntity extends TaskEntity {}
@ClassDataSource({
  source: (http, injector, id, body) => {
    return http.put(`http://127.0.0.1:3000/${TASK_ROUTER_PATH}/${id}`, body);
  },
})
export class TaskItemUpdateEntity extends TaskEntity {}
@ClassDataSource({
  source: (http, injector, id) => {
    return http.post(`http://127.0.0.1:3000/${TASK_ROUTER_PATH}/run/${id}`, {});
  },
})
export class TaskRunEntity {}
