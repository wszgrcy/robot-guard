import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './schedule/item/item.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleModule } from './schedule/schedule.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/schedule/item' },
  {
    path: 'schedule',
    children: [
      { path: 'list', component: ScheduleComponent },
      { path: 'item', component: ItemComponent },
      { path: 'item/:id', component: ItemComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ScheduleModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
