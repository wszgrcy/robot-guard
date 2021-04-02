import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { identity } from 'rxjs';
import { PuppeteerWebEngine } from '../../engine/web/puppeteer/puppeteer';
import { TaskRunService } from './task-run.service';
import { TaskService } from './task.service';
/**
 * 计划?
 * 计划步骤
 *
 */
@Controller('task')
export class TaskController {
  constructor(
    private taskService: TaskService,
    private taskRunService: TaskRunService,
  ) {}
  @Post('run/:id')
  async run(@Param('id') id: string) {
    await this.taskRunService.run(id);
    return { msg: '成功' };
  }
  @Get()
  async list() {
    return this.taskService.findAll();
  }
  @Post()
  async addItem(@Body() body) {
    return this.taskService.create(body);
  }
  @Put(':id')
  async changeItem(@Param('id') id, @Body() body) {
    return this.taskService.change(id, body);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
