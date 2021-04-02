import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { SCHEDULE_ROUTER_PATH } from '@rg-share';
/**
 * 计划?
 * 计划步骤
 *
 */
@Controller(SCHEDULE_ROUTER_PATH)
export class ScheduleController {
  constructor(private service: ScheduleService) {}
  @Post()
  async run(@Body() body) {
    return this.service.create(body);
  }
  @Get(':id')
  async item(@Param('id') param: string) {
    return this.service.findOne(param);
  }
  @Put(':id')
  async changeItem(@Param('id') id: string,@Body() body) {
    console.log('param',id)
    return this.service.change(id,body);
  }
  @Get()
  async list() {
    return this.service.findAll();
  }
}
