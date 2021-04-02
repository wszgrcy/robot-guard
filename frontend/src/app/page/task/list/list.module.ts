import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './list.component';
import { MatTableModule } from '@angular/material/table';
import { TaskItemModule } from '../item/item.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [CommonModule, MatTableModule,TaskItemModule,MatDialogModule],
  declarations: [TaskListComponent],
})
export class TaskListModule {}
