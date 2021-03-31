import { ClassDataSource } from 'cyia-ngx-common/repository';
import { SCHEDULE_ROUTER_PATH } from "@rg-share";
@ClassDataSource({
  source: (http) => {
    return http.get(`http://127.0.0.1:3000/${SCHEDULE_ROUTER_PATH}`);
  },
})
export class ScheduleEntity {
  type!: string;
  name!: string;
  steps!: any[];
}

@ClassDataSource({
  source: (http, inject, body) => {
    return http.post(`http://127.0.0.1:3000/${SCHEDULE_ROUTER_PATH}`, body);
  },
})
export class AddScheduleEntity {}
