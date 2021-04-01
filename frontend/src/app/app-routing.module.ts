import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleItemComponent } from './page/schedule/item/item.component';
import { ScheduleListComponent } from './page/schedule/list/list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/schedule/item' },
  {
    path: 'schedule',
    children: [
      { path: 'list', component: ScheduleListComponent },
      { path: 'item', component: ScheduleItemComponent },
      { path: 'item/:id', component: ScheduleItemComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
